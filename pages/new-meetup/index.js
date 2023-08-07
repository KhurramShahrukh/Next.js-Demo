import NewMeetupForm from '@/components/meetups/NewMeetupForm'
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';

function NewMeetup() {
  const router = useRouter()

  const addMeetupHandler = async (enteredMeetupData) => {
    const { data } = await axios.post('/api/new-meetup', enteredMeetupData)
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Next.js Meetups</title>
        <meta
          name='description'
          content='Add your own meetups and create amazing networking opportunities.'
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  )
}

export default NewMeetup