import React, { useContext, useEffect } from 'react'
import { MachineContext } from 'state'
import { Stories } from 'components/Stories'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { Story } from 'components/Story'
import { useService } from '@xstate/react'


const Home = () => {
    const [machine, sendToMachine] = useContext(MachineContext);

    const { stories, error, selectedStory } = machine.context;

    const { pathname } = useLocation();
    

    const storyUrl = `story/${selectedStory?.machine?.context?.story?.id}`

    useEffect(() => {
        // if (stories && stories.length) { 
        // } else {

            sendToMachine('LOAD_STORIES')
        
        // }
    }, [])
    return (
        <div style={{display: 'flex'}}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                Welcome Home

                {machine.matches('list.loading') && <h2>Loading . . .</h2>}
                {machine.matches('list.fail') &&
                    (<div style={{ color: 'red' }}>Error Loading Stories: {error.toString()}</div>)
                }
                    {stories && stories.length > 0 && (<Stories stories={stories} sendToMachine={sendToMachine} />)}
            </div>
            <div style={{marginLeft: '20px'}}>
                <Switch>
                    <Route path='/story/:id'>
                        <Story selectedStory={selectedStory} />
                    </Route>
                </Switch>
            </div>
            {machine.matches('list.selected') && pathname !== storyUrl && <Redirect to={storyUrl} />}
            {/* {machine.matches('list.selected') && console.log(selectedStory?.machine)} */}

        </div>
    )
}

export default Home;