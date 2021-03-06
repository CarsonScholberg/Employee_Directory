import React from 'react'
import API from '../../utils/API'

class Table extends React.Component {
    state ={
        resultEmployees: [],
        filtered: [],
        sorted: false
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

    sortTable = event => {
        event.preventDefault();
        let sorted = this.state.filtered.sort((elementOne, elementTwo) => {
            let firstComparator = elementOne.name.last.toLowerCase()
            let secondComparator = elementTwo.name.last.toLowerCase()

            if(firstComparator < secondComparator){
                if(this.state.sorted){
                    return 1;
                }else{
                    return -1;
                }
            }
            if(firstComparator > secondComparator){
                if(this.state.sorted){
                    return -1;
                }else{
                    return 1;
                }
            }

            return 0;
        })
        this.setState({sorted: !this.state.sorted})
        this.setState({filtered: sorted})
    }

    render(){
        return (
            <>
            <div>
                <input placeholder="Search our Employees" onChange={this.handleChange}/>
                <button onClick={this.sortTable}>Sort by Name</button>
            </div>
            <div>
                
            </div>
            <table class="table table-dark">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            </tr>
        </thead>
        <tbody>
                {
                    this.state.filtered.map(element => (
                        
                        <tr>
                        <th scope="row">{element.id.value}</th>
                        <td> {element.name.first}</td>
                        <td> {element.name.last}</td>
                        
                        </tr>
                    ))
                }
        
        </tbody>
        </table>
            </>
        )
    }
}

export default Table
