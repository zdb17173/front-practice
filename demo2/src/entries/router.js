import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { RouteComponentProps, withRouter } from 'react-router';
import ReactDOM from "react-dom";
import { Button } from 'antd';

//https://reactrouter.com/web/api/Route/route-render-methods
//需要使用withRouter封装，封装后可使用三个对象const { match, location, history } = this.props;
const Home = withRouter(class Home extends React.Component {
    render() {
        const { history } = this.props;
        return (
            <div>
                <h1>Home</h1>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                    <Button type="primary" onClick={() => history.push(`/dashboard/1123`)}>Edit</Button>
                </ul>
                {this.props.children}
            </div>
        );
    }
});

const About = withRouter(class About extends React.Component {
    render() {
        return (<h3>About</h3>);
    }
});

const Inbox = withRouter(class Inbox extends React.Component {
    render() {
        return (
            <div>
                <h2>Inbox</h2>
                {this.props.children || "Welcome to your Inbox"}
            </div>
        );
    }
});

const Dashboard = withRouter(class Dashboard extends React.Component {
    render() {
        return <h3>Dashboard {this.props.match.params.id}</h3>
    }
});

ReactDOM.render(
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/dashboard/10">Dashboard</Link>
                </li>
            </ul>

            <hr />

            {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/dashboard/:id?">
                    <Dashboard />
                </Route>
                <Route>
                    <Home />
                </Route>
            </Switch>
        </div>
    </Router>
    , document.getElementById("root"));

