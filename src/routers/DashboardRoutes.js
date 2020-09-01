import React from 'react'
import { Navbar } from '../componets/ui/Nabvar';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MarvelScreen } from '../componets/marvel/MarvelScreen';
import { HeroScreen } from '../componets/heroes/HeroScreen';
import { DcScreen } from '../componets/dc/DcScreen';
import { SearchScreen } from '../componets/search/SearchScreen';

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />
            <div className="container mt-5" >
                <Switch>
                    <Route exact path="/marvel" component={ MarvelScreen } />
                    <Route exact path="/hero/:heroId" component={ HeroScreen }  />
                    <Route exact path="/dc/" component={ DcScreen }  />
                    <Route exact path="/search" component={ SearchScreen } />
                    <Redirect to="/marvel" />

                </Switch>
            </div>


        </>
    )
}
