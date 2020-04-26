import React, {useContext, useEffect} from 'react'
import { useService } from '@xstate/react'
import { useParams } from 'react-router-dom'


export const Story = ({ selectedStory }) => {
    const {id} = useParams()
    const [storyService, sendToStory] = useService(selectedStory);

    const {story, comments} = storyService.context;



    return (
        <div>
            <h2>
                {story.title}
            </h2>
            {/* <pre>{JSON.stringify(comments, null, 2)}</pre> */}
            {/* WE COULD SPIN A NEW MACHINE FOR THE COMMENTS SERVICE */}
            <h4>Comments</h4>
            {storyService.matches('loading') && <h3>Loading . . .</h3>}
            {comments && comments.map(comment => (
                <div key={comment.id}>
                    <hr></hr>
                    {comment.text} by {comment.by}
                </div>
            ))}
        </div>
    )
}

export default Story