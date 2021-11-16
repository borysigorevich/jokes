import React, {useEffect, useState} from 'react'

const asyncFn = () => Promise.resolve('Resolve')

const AppTest = () => {
    const [input, setInput] = useState('')
    const [testValue, setTestValue] = useState('')
    const [dummyData, setDummyData] = useState('')

    useEffect(() => {
        const callAsyncFc = async () => {
            const data = await asyncFn()
            setDummyData(data)
        }
        callAsyncFc()
    }, [])

    const handleClick = () => {
        setTestValue(input)
    }

    return <div>
        <div>
            <span>search {testValue}</span>
        </div>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
        </ul>
        <div>
            <p>Promise {dummyData}</p>
        </div>
        <input type="text" placeholder={'input'} onChange={(e) => setInput(e.target.value)} value={input}/>
        <button onClick={handleClick}>Click</button>
    </div>
}


export default AppTest