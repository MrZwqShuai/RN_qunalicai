import * as React from 'react';
import createArticleSkeletonScreen from './article-layout';
import createQNLayOutSkeletonScreen from './qn-layout';
export default function createSkeletonScreen(WrappedComponent) {
 
   class SkeletonScreen extends React.PureComponent {
     static Article;
     static QNLayOut;
     render() {
       let props = {
         ...this.props
       }
       return (
         <WrappedComponent {...props} />
       )
     }
   }
   SkeletonScreen.QNLayOut = createQNLayOutSkeletonScreen(SkeletonScreen);
   SkeletonScreen.Article = createArticleSkeletonScreen(SkeletonScreen);

   return SkeletonScreen;
}