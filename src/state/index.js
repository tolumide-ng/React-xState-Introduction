import {createContext} from 'react'
import { Machine, spawn } from 'xstate'
import { auth } from './auth'
import {list} from './list'
import {assign} from 'xstate'
import { createStoryMachine } from './story'


export const MachineContext = createContext()


export const appMachine = Machine({
    id: 'app',
    initial: 'init',
    context: {
        user: undefined, 
        error: undefined,
        stories: [],
        selectedStory: undefined
    },
    states: {
        init: {},
        auth,
        list
    },
    on: {
        'LOGIN': {
            target: 'auth.started'
        },
        'LOAD_STORIES': {
            target: 'list.loading'
        },
        'SELECT_STORY': {
            target: 'list.selected',
            actions: assign((context, event) => {
                const newStoryMachine = spawn(createStoryMachine(event.story))
                return {selectedStory: newStoryMachine}
            })
        }
    }
})


