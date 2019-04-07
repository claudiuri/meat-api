import * as restfy from 'restify'

export const handleError = (req: restfy.Request, resp: restfy.Response, err, done) => {
    
    err.toJSON = () =>{
        return {
            message : err.message
        }
    }
    switch(err.name){
        case 'MongoError':
            if (err.code === 11000) {
                err.statusCode = 400
            }
            break

        case 'ValidationError':
            err.statusCode = 400
            const messages: any[] = []

            for (let name in err.errors) {
               messages.push({message: err.errors[name].message})
            }

            err.toJSON = () =>({
                message: 'Validation error while processing your request',
                errors: messages
            })

            break
    }

    done()
}