import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ErrorBoundary from './pages/ErrorPage.jsx';

function App() {

    return (
        <>
            <Header />

            <main>
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
            </main>

            <Footer />
        </>
    );
}

export default App;
