import mongoose from 'mongoose'


const DBConnection= async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        })

        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de iniciar la DB')
    }
}
export default DBConnection