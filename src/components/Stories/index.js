import React from 'react'
import { Link } from 'react-router-dom'
import {Story} from 'components/Story'

export const Stories = ({stories, sendToMachine}) => {
    const selectStory = (e, story) => {
        e.preventDefault();
        sendToMachine('SELECT_STORY', {story})
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '400px', textAlign: 'left'}}>
            {stories.map(story => (
                <div key={story.id}>
                    <a href='#' onClick={(e) => selectStory(e, story)}>
                        {/* <Story selectedStory={story} /> */}
                        {story.title}
                    </a>
                </div>)
            )}
        </div>
    )
}


export default Stories