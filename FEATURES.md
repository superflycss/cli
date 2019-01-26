Feature: Minimizing CSS Selectors to the Set Used by Main HTML Files

Context:
The directory `src/main/html` can contain multiple html files and we wish to filter our built `target/main/css/` file `composite.css` file against 
these html files.


Scenario: Building a filtered `filtered.css` file.