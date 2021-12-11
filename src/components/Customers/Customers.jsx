import { Routes, Route, useParams } from 'react-router-dom'
import Table, { CustomerTable } from './Table';

const Greeting = () => {
    let { name } = useParams();
    return (
        <h1>Hello, {name}!</h1>
    );
}

const Customers = () => {
    return (
        <Routes>
            <Route exact path='/' element={null} />
            <Route path='/customers' element={<CustomerTable />} />
            <Route path={'/greeting/:name'} element={<Greeting />} />
        </Routes>
    );
}

export default Customers