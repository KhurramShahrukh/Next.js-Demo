import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            const client = await MongoClient.connect("mongodb+srv://Khurram:5z0jYPIDfujHKrwJ@meetup-application-db.kmxvr5i.mongodb.net/meetups?retryWrites=true&w=majority")
            const db = client.db();
            const meetupsCollection = db.collection('meetups');
            const result = await meetupsCollection.insertOne(data);
            client.close()
            res.status(201).json({ data, message: 'Meetup inserted!' })
        } catch (err) {
            console.log(err)
        }
    }
}

export default handler