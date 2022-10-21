# Notes about testing
- [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Which query should I use?](https://testing-library.com/docs/queries/about)
- [Testing Playground](https://testing-playground.com/)
- [Chrome Extension](https://chrome.google.com/webstore/detail/testing-playground/hejbmebodbijjdhflfknehhcgaklhano/related)


## Important for a good testing in React
1. Atomixity
2. Component: just one logic
3. Reusability
4. Component no depends on another

## Tipos queries
- **getBy**: 
  - sino encuentra un elemento del DOM falla el testing
  - Falla si se encuentra más de un elemento
- **queryBy** sino encuentra un elemento manda un `Null`
- **findBy** cuando debamos esperar cierto tiempo para que el valor aparezca podemos usarla para reemplazar **waitFor**
