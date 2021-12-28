import Button from 'react-bootstrap/Button'

const Home = ({setUser}) => {
    return (
        <div>
            <h1>Home Page</h1>
            <Button 
                variant="outline-primary"
                onClick={() => {setUser({})}}
            >Logout</Button>{' '}
        </div>
    )
}

export default Home