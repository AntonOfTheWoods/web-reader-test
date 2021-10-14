import React from 'react';
import './App.css';
import {
  ChakraProvider,
  Heading,
  UnorderedList,
  ListItem,
  Box,
  Text,
} from '@chakra-ui/react';

import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import WebReader from '@nypl/web-reader';
import {getTheme} from '@nypl/web-reader/dist/types/ui/theme'
import { Injectable } from '@d-i-t-a/reader/dist/types/navigator/IFrameNavigator';

const origin = window.location.origin;

const cssInjectables: Injectable[] = [
  {
  type: 'style',
  url: `${origin}/readium-css/ReadiumCSS-after.css`,
},
  {
  type: 'style',
  url: `${origin}/readium-css/ReadiumCSS-before.css`,
},
  {
  type: 'style',
  url: `${origin}/readium-css/ReadiumCSS-default.css`,
},
];
const fontInjectable: Injectable = {
  type: 'style',
  url: `${origin}/fonts/opendyslexic/opendyslexic.css`,
  fontFamily: 'opendyslexic',
};

const htmlInjectables = cssInjectables.concat(fontInjectable);


function App() {
  return (
    <ChakraProvider theme={getTheme('day')}>
      <BrowserRouter>
        <Switch>
          <Route path="/streamed-alice-epub">
            <WebReader
              injectables={htmlInjectables}
              webpubManifestUrl="https://alice.dita.digital/manifest.json"
            />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="*">
            <h1>404</h1>
            <p>Page not found.</p>
          </Route>
        </Switch>
      </BrowserRouter>
    </ChakraProvider>

  );
}

const HomePage = () => {
  return (
    <Box m={2}>
      <Heading as="h1">NYPL Web Reader</Heading>
      <Heading as="h2" fontSize={2} mt={3}>
        Generic Examples
      </Heading>
      <UnorderedList p={4}>
        <ListItem>
          Remote hosted WebPubs
          <UnorderedList>
            <ListItem>
              <Link to="streamed-alice-epub">
                Alice's Adventures in Wonderland
              </Link>
              <Text as="i">
                &nbsp;(streamed from https://alice.dita.digital)
              </Text>
            </ListItem>
          </UnorderedList>
        </ListItem>
      </UnorderedList>
    </Box>
  );
};


export default App;
