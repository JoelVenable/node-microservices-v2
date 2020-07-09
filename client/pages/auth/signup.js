import { useState } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/useRequest'


export default function signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [{ data, loading, errors }, doRequest] = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,
            password
        },
        onSuccess: () => Router.push('/')
    })

    console.log(data)

    const onSubmit = async (event) => {
        event.preventDefault();
        await doRequest()
    }

    return (
        <div className="container">

            <form onSubmit={onSubmit}>
                <h1>Sign Up</h1>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        className="form-control"
                        value={email}
                        onChange={e => setEmail(e.currentTarget.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.currentTarget.value)}
                    />
                </div>
                {errors}
                <button className="btn btn-primary">Sign Up</button>

            </form>
        </div>

    )
}