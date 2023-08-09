import NewMeetupForm from '@/components/meetups/NewMeetupForm'
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';

function NewMeetup() {
  const router = useRouter()
  const IS_CLIENT = typeof window !== undefined;

  const addMeetupHandler = async (enteredMeetupData) => {
    const { data } = await axios.post('/api/new-meetup', enteredMeetupData)
    if (IS_CLIENT) {
      // revalidate home page
      const url = `${window.location.origin}/api/revalidate?secret=${'42144be23f0e745ad57b2dd0bcb2cb69c59a92003cb7390485862e12b0b7bf98'}`
      await axios.get(url)
    }
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