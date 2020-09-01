import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { PrivateRoutes } from './PrivateRoutes';

import { LoginScreen } from '../componets/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const { user: { logged } } = useContext( AuthContext );

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        exact
                        path="/login" 
                        component={ LoginScreen } 
                        isAuthenticated={ logged } 
                    />
                    <PrivateRoutes  
                        path="/" 
                        component={ DashboardRoutes } 
                        isAuthenticated={ logged } 
                    />
                </Switch>
            </div>
        </Router>
    )
}
