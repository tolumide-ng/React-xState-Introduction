import {createContext} from 'react'
import { Machine } from 'xstate'
import { auth } from './auth'
import {assign} from 'xstate'


export const MachineContext = createContext()


const getComment = id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`

const fetchComments = async (context) => {
    const { kids } = context.story
    const comments = await Promise.all(kids.map(id => getComment(id))
        .map(url => fetch(url).then(r => r.json())))
    return comments;
}


export const createStoryMachine = (story) => Machine({
    id: 'story',
    initial: 'init',
    context: {
        story,
        error: undefined,
        comments: []
    },
    states: {
        init: {
            on: {
                '': {
                    target: 'loading',
                    cond: (context) => !context.comments.length
                }
            }
        },
        loading: {
            invoke: {
                id: 'fetchComments',
                src: fetchComments,
                onDone: {
                    target: 'success',
                    actions: assign({comments: (context, event) => event.data})
                },
                onError: {
                    target: 'fail',
                    actions: assign({error: (context, event) => event.data})
                }
            }
        },
        success: {},
        fail: {}
    },
    on: { }
})


