const handleError = (error: unknown, fn: (error: Error) => unknown) => {
    if(error instanceof Error) 
        return fn(error)
    else console.log(`error isn't of type Error`)
}

export default handleError