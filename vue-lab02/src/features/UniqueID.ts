let UUID = 0
export function UniqueID() {
    const getID = (): string => {
        UUID++ 
        return UUID.toString()
    }
    return { 
        getID 
    }
}