import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            loggedIn: false
        };
    }

    componentDidMount() {
        if (localStorage.getItem('lastName') == null) {
            this.setState({
                loggedIn: false
            })
        } else {
            this.setState({
                loggedIn: true
            })
        }
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }


    render() {
        let { loggedIn } = this.state;
        let item = loggedIn === true
            ? <NavItem><NavLink onClick={this.handleLogout}>Logout</NavLink></NavItem>
            : <><NavItem><NavLink href="/login/">Login</NavLink></NavItem> <NavItem><NavLink href="/register/">Register</NavLink></NavItem></>
        return (
            <div>
                <Navbar color="faded" light className="navbar">
                    <NavbarBrand href="/bucketlist/" className="mr-auto">BucketLit</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="/">Profile</NavLink>
                            </NavItem>
                            {item}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}