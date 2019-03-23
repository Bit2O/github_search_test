import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchVal: '',
            jsonData: {
                items: []
            }
        }
    }

    startSearch = e => {
        e.preventDefault()
        let searchLink = `https://api.github.com/search/repositories?q=${this.state.searchVal}&sort=stars&order=desc`
        console.log(`search link ${searchLink}`)
        let that = this
        fetch(searchLink)
            .then(function (data) {
                data.json().then((jsonData) => that.setState({
                    jsonData
                }, () => console.log("jsonData is: ", that.state.jsonData)))
            })
            .catch(err => console.log(err))

    }

    render() {

        const { items } = this.state.jsonData

        return (
            <div className="App">
                <header className="App-header">
                    <h3>Front-end-test</h3>
                </header>
                <div className="container">

                    <div>
                        <div className="row">
                            <div className="col-half col-offset">
                                <div className="form-inline">
                                    <div className="form-group" style={{ marginRight: '2rem' }}>
                                        <input className="form-control" onChange={e => this.setState({ searchVal: e.target.value })} type="text" name="searchText" id="searchText" placeholder="enter search text" />
                                    </div>
                                    <button onClick={e => this.startSearch(e)} color="primary">Search</button>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="card-columns">
                                {
                                    items.map((card, i) => {
                                        return (
                                            <div className="card" key={card.id}>
                                                <img className="card-img-top" width="100%" src={card.owner.avatar_url || "https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180"} alt="Card image cap" />
                                                <div className="card-body">
                                                    <div className="card-title">{card.name}</div>
                                                    <div className="card-subtitle">{`Forks: ${card.fork ? card.forks : '0'}, issues: ${card.has_issues ? card.open_issues_count : 'No issues'}`}</div>
                                                    <p className="card-text">{card.description}</p>
                                                    <a style={{wordBreak: 'break-all'}} className="btn btn-secondary">{card.url}</a>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
