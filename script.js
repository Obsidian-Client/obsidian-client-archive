/**
 * This file is part of the Obsidian Client Archive
 * (in the following referred to as "this archive").
 * Copyright (C) 2022  Alexander Richter
 * 
 * This archive is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This archive is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this archive.  If not, see <https://www.gnu.org/licenses/>.
*/

//Main method, runs when the page is loaded:
window.onload = function() {
    //createFileView(); Disabled, so the "File-View" can be created (positioned) manually.
    fillFileView("obsidian-client", "obsidian-client-archive", getURLVariable("path"));
}

//Creates the "File-View":
function createFileView() {
    let htmlString = `<ul class="file-view"></ul>`;
    window.document.getElementsByTagName("body")[0].innerHTML += htmlString;
}

//Fills the "File-View" with content.
//user = user / organization of the Github repository
//repo = name of the repository
//path = file path inside the repository
async function fillFileView(user, repo, path) {

    //Contains paths that should not be included:
    const dirsToIgnore = [
        "legal",
        "res",
        "_config.yml",
        "CNAME",
        "README.md",
        "index.html",
        "style.css",
        "script.js",
        "404.html"
    ];

    //Getting the content of the path through the Github API:
    const response = await fetch(`https://api.github.com/repos/${user}/${repo}/contents/${path}`);
    const data = await response.json();

    //Split the input into the arrays below:
    const listDirs = new Array();
    const listFiles = new Array();
    for (let rawFile of data) {
        if (!dirsToIgnore.includes(rawFile.path)) {
            if (rawFile.type == "dir") {
                listDirs.push(rawFile);
            } else {
                listFiles.push(rawFile);
            }
        }
    }

    //Converting the content of both arrays into html:
    let htmlString = "";
    //For directories:
    for (let dir of listDirs) {
        htmlString += `<li><a href="?path=${dir.path}">${dir.name}/</a></li>`;
    }
    //For files:
    for (let file of listFiles) {
        htmlString += `<li><a href="${file.path}">${file.name}</a></li>`;
    }

    //Adding the htmlString into the document:
    document.getElementsByClassName("file-view")[0].innerHTML = htmlString;

}

//Utillity method for getting variables specified in the URL of this page:
function getURLVariable(variableName) {
    variableName = RegExp("[?&]" + variableName.replace(/([[\]])/, '\\$1') + '=([^&#]*)');
    return (window.location.href.match(variableName) || ['', ''])[1];
}