import { MongoClient } from 'mongodb';

const meetupsHandler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const client = await MongoClient.connect("mongodb+srv://Khurram:5z0jYPIDfujHKrwJ@meetup-application-db.kmxvr5i.mongodb.net/meetups?retryWrites=true&w=majority")
            const db = client.db();
            const meetupsCollection = db.collection('meetups');
            const meetups = await meetupsCollection.find().toArray();
            client.close()
            res.status(200).json({ data: meetups, message: 'meetups fetched successfully!' })
        } catch (err) {
            console.log(err)
        }
    }
}

export default meetupsHandler