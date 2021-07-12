import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AuthenticatedLayout from 'layout/Authenticated';
import UnauthenticatedLayout from 'layout/Unauthenticated';
import { useTranslation } from 'react-i18next';
import { authenticatedRoutes, unauthenticatedRoutes } from 'constants/routes';
import { pageAnimationData } from 'constants/animations';
import useUser from '../../hooks/useUser';

export function App() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const user = useUser();

  return (
    <>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      {user?.id && (
        <AuthenticatedLayout>
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location?.pathname}>
              {authenticatedRoutes.map(({ component: Component, path }) => (
                <Route key={path} exact path={path}>
                  <motion.div {...pageAnimationData} key={path}>
                    <Component />
                  </motion.div>
                </Route>
              ))}
            </Switch>
          </AnimatePresence>
        </AuthenticatedLayout>
      )}

      <UnauthenticatedLayout>
        <Switch location={location} key={location?.pathname}>
          {unauthenticatedRoutes.map(({ component: Component, path }) => (
            <Route key={path} exact path={path}>
              <Component />
            </Route>
          ))}
        </Switch>
      </UnauthenticatedLayout>
    </>
  );
}
