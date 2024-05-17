import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { blogPosts } from '../blogsPosts/blogPosts'

export default function BlogPost() {
  const { slug } = useParams()
  const [upVotes, setUpVotes] = useState(0)
  const [postState, setPostState] = useState('Neutral')

  function upVote() {
    setUpVotes(upVotes + 1)
    checkState();
  }

  function downVote() {
    setUpVotes(upVotes - 1);
    checkState();
  }

  function checkState() {
    if (-10 < upVotes && upVotes < 10) {
      setPostState('Neutral');
      console.log("Neutral");
    } else if (10 <= upVotes) {
      setPostState('Well received');
      console.log("Well received");
    } else if (upVotes <= -10) {
      setPostState('Poorly received');
      console.log("Poorly received");
    }
  }

  const { title, imgUrl, content } = blogPosts[slug];
  const URL = 'https://jsonplaceholder.typicode.com/users'

  useEffect(() => {
    fetch(URL)
      .then(result => result.json())
      .then(json => console.log(json))
  }, []);

  useEffect(() => {
    console.log("use effect");
  }, [upVotes]);

  return (
    <div className='flex flex-col items-center space-y-4 p-10'>
      <img className='h-96 w-96 rounded-full object-cover' src={imgUrl} alt={imgUrl} />
      <h1 className='font-bold text-4xl'>{title}</h1>
      <p className='text-lg'>{content}</p>
      <div className='flex flex-row items-center space-x-4'>
        <button onClick={upVote} className='border rounded p-2'>👍</button>
        <p>{upVotes}: {postState}</p>
        <button onClick={downVote} className='border rounded p-2'>👎</button>
      </div>
    </div>
  )
}