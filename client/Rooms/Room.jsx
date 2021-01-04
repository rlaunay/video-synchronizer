import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import io from 'socket.io-client'

import YouTube from 'react-youtube';
import PeopleIcon from './../icons/PeopleFill'
import './Room.scss'

let socket

const Room = () => {
    const {roomId} = useParams()

    const [videoUrl, setVideoUrl] = useState('')
    const [videoId, setVideoId] = useState('')
    const [nbPeople, setNbPeople] = useState(0)

    const [error, setError] = useState('')

    const ENDPOINT = 'localhost:3000'

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit('join', {roomId})
        return () => {
            socket.disconnect()
        }
    }, [roomId])

    useEffect(() => {
        socket.on('newPeople', (nbPeople) => {
            setNbPeople(nbPeople)
        })
    }, [nbPeople])

    useEffect(() => {
        socket.on('newVideo', (newVideoId) => {
            setVideoId(newVideoId)
        })
    }, [videoId])

    useEffect(() => {
        socket.on('startVideo', () => {
            window.PLAYER.playVideo()
        })

        socket.on('stopVideo', () => {
            window.PLAYER.pauseVideo()
        })
    }, [])

    const addVideoHandler = () => {
        if (videoUrl !== '') {
            socket.emit('addVideo', {roomId, videoUrl})
        } else {
            setError('is-invalid')
        }
    }

    const readyVideoHandler = (event) => {
        window.FIRST = true
        window.PLAYER = event.target
    }

    const playHandler = (event) => {
        if (window.FIRST) {
            window.FIRST = false
            event.target.pauseVideo()
        } else {
            socket.emit('playVideo', roomId)
        }
    }

    const pauseHandler = (event) => {
        socket.emit('pauseVideo', roomId)
    }

    return (
        <div className="container">
            <div className="row">
                <h1 className="text-center mt-5">Video Synchronizer</h1>
                <div className="d-flex justify-content-center align-items-center mt-3">
                    <PeopleIcon/>
                    <span className="NumbersOfPeople">{nbPeople}</span>
                </div>
            </div>
            <label className="form-label mt-5" htmlFor="videoUrl">
                Enter youtube video URL
            </label>
            <div className="input-group mb-3 url-form">
                <input
                    className={'form-control ' + error}
                    type="text"
                    name="videoUrl"
                    id="videoUrl"
                    aria-describedby="urlInvalid"
                    value={videoUrl}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => setVideoUrl(e.target.value)}
                />
                <div id="urlInvalid" className="invalid-feedback ErrorLabel">
                    Please enter an URL
                </div>
                <button
                    className="btn btn-dark btn-lg"
                    onClick={addVideoHandler}
                >
                    Add
                </button>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
                {
                    videoId ?
                        <YouTube
                            id="youtube-player"
                            videoId={videoId}
                            opts={{
                                height: '390',
                                width: '640',
                                playerVars: {
                                    autoplay: 1,
                                },
                            }}
                            onReady={readyVideoHandler}
                            onPlay={playHandler}
                            onPause={pauseHandler}/>
                                :
                                <h1>Pas de video sélectionné</h1>
                            }

                    </div>
                    </div>
                    )
                    }

                    export default Room
