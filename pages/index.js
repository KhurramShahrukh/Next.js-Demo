import MeetupList from '@/components/meetups/MeetupList'
import { MongoClient } from 'mongodb'
import Head from 'next/head'

function HomePage(props) {

  return (
    <>
      <Head>
        <title>Next.js Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active Next.js meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  )
}

export const getServerSideProps = async () => {
  // This code will always run on the server
  const client = await MongoClient.connect("mongodb+srv://Khurram:5z0jYPIDfujHKrwJ@meetup-application-db.kmxvr5i.mongodb.net/meetups?retryWrites=true&w=majority")
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray()

  client.close()

  return {
    props: {
      meetups: meetups.map((item) => ({
        id: item._id.toString(),
        image: item.image,
        title: item.title,
        address: item.address
      }))
    }
  }
}

export default HomePage