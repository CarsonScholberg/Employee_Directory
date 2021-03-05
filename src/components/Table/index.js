import React from 'react'
import API from '../../utils/API'

class Table extends React.Component {
    state ={
        resultEmployees: [],
        filtered: []
    }

    componentDidMount(){
        this.searchEmployee()
    }

    searchEmployee() {
        API.search()
            .then(res => this.setState({resultEmployees: res.data.results}))
            .then(res => this.setState({filtered: this.state.resultEmployees}))
            .then(res => console.log(this.state.resultEmployees))
    }

    handleChange = event => {
        let searchTerm = event.target.value.toLowerCase()
        const filtered = this.state.resultEmployees.filter(query => query.name.first.toLowerCase().includes(searchTerm) ||  query.name.last.toLowerCase().includes(searchTerm))
        this.setState({filtered: filtered})
    }

    render(){
        return (
            <>
            <div>
                <input placeholder="Search our Employees" onChange={this.handleChange}/>
            </div>
            <div>
                {
                    this.state.filtered.map(element => (
                        <h2>Name: {element.name.first} {element.name.last}</h2>
                    ))
                }
            </div>
            </>
        )
    }
}

export default Table
