module.exports = () => {
  return `
/** @define component  */

/*! | superflycss/component-sfly |
     | MIT License                |
     | https://github.com/superflycss/component-sfly/blob/master/LICENSE.md */
 
:root {
--SFly-width: 100%;
--SFly-height: 100px;
--SFly-background-color: blue;
--SFly {
 width: var(--SFly-width);
 height: var(--SFly-height);
 background-color: var(--SFly-background-color);
}
}

.SFly {
@apply(--SFly);
}        
`;
}

