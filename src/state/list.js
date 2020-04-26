import { assign } from 'xstate'



const storiesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const getStoryData = id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`

const fetchStories = async () => {
    const storyIds = await fetch(storiesUrl).then(r => r.json());
    const topTenStories = await Promise.all(storyIds.slice(0, 9).map(id => getStoryData(id))
    .map(url => fetch(url).then(r => r.json())));
    return topTenStories;
}


export const list = {
    states: {
        loading: {
            invoke: {
                id: 'fetchStories',
                src: fetchStories,
                onDone: {
                    target: 'success',
                    actions: assign({stories: (context, event) => event.data})
                },
                onError: {
                    target: 'fail',
                    actions: assign({error: (context, event) => event.data})
                }
            }
        },
        success: {},
        fail: {},
        selected: {}
    }
}