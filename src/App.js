import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Header } from './components/ui/Header';
import { DirectorView } from './components/director/DirectorView';
import { GeneroView } from './components/genero/GeneroView';
import { MediaView } from './components/media/MediaView';
import { ProductoraView } from './components/productora/ProductoraView';
import { TipoView } from './components/tipo/TipoView';
import { MediaUpdate } from './components/media/MediaUpdate';


const App = () => {
  return <Router>
    <Header/>
    <Switch>
        <Route exact path='/' component={ MediaView } />
        <Route exact path='/genero' component={ GeneroView } />
        <Route exact path='/tipo' component={ TipoView } />
        <Route exact path='/director' component={ DirectorView } />
        <Route exact path='/productora' component={ ProductoraView } />
        <Route exact path='/media/edit/:mediaId' component={ MediaUpdate } />
        <Redirect to='/' />
    </Switch>
  </Router>
}

export {
  App
}
