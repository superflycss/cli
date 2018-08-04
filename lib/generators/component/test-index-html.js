module.exports = () => {
 
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="utf-8">
      <meta content="IE=edge" http-equiv="X-UA-Compatible">
      <meta content="width=device-width, initial-scale=1" name="viewport">
      <title>Test @superflycss/color-utilities</title>
      <link href="../css/index.css" rel="stylesheet">
      <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
    </head>
    
    <body>
      <header class="Header--column">
        <h1 class="Display--fs400fw700">Component Test</h1>
        <a class="Header_link" href="https://github.com/superflycss/component-test/">Github</a>
      </header>
    
      <!-- START TEST 1-->
    
      <div class="TestHeader ">
        <span class="TestCounter"></span>
        <span class="TestComponent">TestBoxLeft</span>
      </div>
    
      <div class="TestContainer">
        <div class="TestInput 
                    u-box-shadow-0-2-12-0-dfe3eb ">
          <div class="TestWhen "></div>
          <div class="TestDescription ">
            <code class="u-text-color-md-pink-400">TextBoxLeft </code> is applied.
          </div>
    
    
          <pre class="TestMarkup ">
    
            <code class="html ">
    <div class="TestBoxLeft">TextBoxLeft</div>
            </code>
    
    
        </pre>
        </div>
        <!--END TEST INPUT-->
        <div class="TestOutput 
                    u-box-shadow-0-2-12-0-dfe3eb ">
          <div class="TestThen "></div>
          <div class="TestDescription">TextBoxLeft is rendered.</div>
        </div>
      </div>
      <!--END TEST OUTPUT-->
    </body>    
    </html>
`
}
    
