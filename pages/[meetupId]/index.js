import MeetupDetail from '@/components/meetups/MeetupDetail'
import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { DeleteCTA, Wrapper } from '@/styles/styles'

function MeetupId(props) {
  const { id, title, image, address, description } = props
  const IS_CLIENT = typeof window !== undefined;

  const router = useRouter()

  const deleteMeetup = async () => {
    const data = await axios.delete(`/api/delete-meetup?id=${id}`)
    if (IS_CLIENT) {
      const url = `${window.location.origin}/api/revalidate?secret=${'42144be23f0e745ad57b2dd0bcb2cb69c59a92003cb7390485862e12b0b7bf98'}`
      const revalidateHomePage = await axios.get(url)
    }
    setTimeout(() => {
      router.push('/')
    }, 10000);
  }

  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
        <meta
          name='description'
          content={description}
        />
      </Head>
      <MeetupDetail
        id={id}
        title={title}
        image={image}
        address={address}
        description={description}
      />
      <div className='center-align'>
        <DeleteCTA onClick={deleteMeetup}>
          Delete
        </DeleteCTA>
      </div>
    </Wrapper>
  )
}

export const getStaticPaths = async () => {
  // This code will always run on the server
  const client = await MongoClient.connect("mongodb+srv://Khurram:5z0jYPIDfujHKrwJ@meetup-application-db.kmxvr5i.mongodb.net/meetups?retryWrites=true&w=majority")
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray()

  client.close()

  return {
    fallback: 'blocking',
    paths: meetups.map((item) => ({
      params: {
        meetupId: item._id.toString()
      }
    }))
  }
}


export const getStaticProps = async (context) => {
  // This code will always run on the server
  const { meetupId } = context.params
  const client = await MongoClient.connect("mongodb+srv://Khurram:5z0jYPIDfujHKrwJ@meetup-application-db.kmxvr5i.mongodb.net/meetups?retryWrites=true&w=majority")
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) })

  const { _id, title, image, address, description } = selectedMeetup

  client.close()

  return {
    props: {
      id: _id.toString(),
      title: title,
      image: image,
      address: address,
      description: description
    },
  }
}

export default MeetupId