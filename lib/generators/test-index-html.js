module.exports = (name) => {
    if (name.includes("-")) {
        const parts = name.split("-");
        const capitalized = parts.map((v)=>{  
            return v.charAt(0).toUpperCase() + v.substring(1);
        });    
        name = capitalized.join(" ");
    }
 
    return `
<!doctype html>
<html lang="en">
<head>
<title>${name} Tests</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${name} Tests">
<meta name="author" content="">
<!-- Font Awesome -->
<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<!-- Test Stylesheet -->
<link rel="stylesheet" type="text/css" href="../css/index.css">
</head>

<body class="Body">
<header class="Header--column">
<h1 class="Display--fs400fw700 u-font-lato">${name} Test</h1>
<a class="Header_link"
    href="https://github.com/superflycss/REPOSITORY/${name}/">Github</a>
</header>

<div class="Test">
<span class="Test_counter"></span>
<span class="Test_component">Grid</span>

<div class="Test_container">
    <div class="Test_input">
        <div class="Test_when"></div>
        <div class="Test_description">When the
            <code>.Grid</code> container holds 2
            <code>.Grid-cell</code> instances.
        </div>
        <pre class="Test_markup">
            <code class="html">
                <div class="Grid">
                    <!-- Use Nunjucks to keep markup DRY -->
{% for cell in ['1', '2'] %}
                    <div class="Grid_cell">{{cell}}/2</div>
{% endfor %}
                </div>
            </code>
        </pre>
    </div>
    <div class="Test_output">
        <div class="Test_then"></div>
        <div class="Test_description">Each grid cell occupies the
            same amount of space witin the grid container row.</div>
    </div>
</div>
</body>
</html>
`
}
    
