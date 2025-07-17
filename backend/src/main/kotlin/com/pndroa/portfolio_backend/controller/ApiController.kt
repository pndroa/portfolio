package com.pndroa.portfolio_backend.controller

import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/")
class ApiController {

    @GetMapping(produces = [MediaType.TEXT_HTML_VALUE])
    fun getApiDocumentation(): ResponseEntity<String> {
        val html = """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>API Documentation</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 2rem;
                        margin: 0;
                        transition: background-color 0.3s, color 0.3s;
                    }
            
                    .light-mode {
                        background-color: #f9f9f9;
                        color: #2c3e50;
                    }
            
                    .dark-mode {
                        background-color: #1e1e1e;
                        color: #ecf0f1;
                    }
            
                    h1, h2 {
                        margin-top: 1.5rem;
                    }
            
                    ul {
                        list-style-type: none;
                        padding-left: 0;
                    }
            
                    li {
                        padding: 8px 12px;
                        margin: 4px 0;
                        border-left: 4px solid;
                        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                    }
            
                    .light-mode li {
                        background: #fff;
                        border-left-color: #3498db;
                    }
            
                    .dark-mode li {
                        background: #2c3e50;
                        border-left-color: #2980b9;
                        box-shadow: 0 1px 2px rgba(255,255,255,0.05);
                    }
            
                    /* Toggle Switch */
                    .switch-wrapper {
                        position: fixed;
                        top: 1rem;
                        right: 1rem;
                    }
            
                    .switch {
                        position: relative;
                        display: inline-block;
                        width: 60px;
                        height: 34px;
                    }
            
                    .switch input {
                        opacity: 0;
                        width: 0;
                        height: 0;
                    }
            
                    .slider {
                        position: absolute;
                        cursor: pointer;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: #ccc;
                        transition: .4s;
                        border-radius: 34px;
                    }
            
                    .slider:before {
                        position: absolute;
                        content: "🌙";
                        height: 26px;
                        width: 26px;
                        left: 4px;
                        bottom: 4px;
                        background-color: white;
                        border-radius: 50%;
                        text-align: center;
                        line-height: 26px;
                        font-size: 16px;
                        transition: .4s;
                    }
            
                    input:checked + .slider {
                        background-color: #3498db;
                    }
            
                    input:checked + .slider:before {
                        transform: translateX(26px);
                        content: "🌞";
                    }
                </style>
            </head>
            <body class="light-mode">
            
                <div class="switch-wrapper">
                    <label class="switch">
                        <input type="checkbox" id="themeToggle" onclick="toggleMode()">
                        <span class="slider"></span>
                    </label>
                </div>
            
                <h1>API Routes</h1>
                <p>Welcome to the API! Below are all available routes grouped by resource:</p>
            
                <h2>Portfolio</h2>
                <ul>
                    <li>GET /portfolio</li>
                    <li>GET /portfolio/{portfolioId}</li>
                    <li>POST /portfolio</li>
                    <li>PUT /portfolio/{portfolioId}</li>
                    <li>DELETE /portfolio/{portfolioId}</li>
                </ul>
            
                <h2>User</h2>
                <ul>
                    <li>GET /user</li>
                    <li>GET /user/{userId}</li>
                    <li>POST /user</li>
                    <li>PUT /user/{userId}</li>
                    <li>DELETE /user/{userId}</li>
                </ul>
            
                <h2>Education</h2>
                <ul>
                    <li>GET /user/{userId}/education</li>
                    <li>GET /user/{userId}/education/{educationId}</li>
                    <li>POST /user/{userId}/education</li>
                    <li>PUT /user/{userId}/education/{educationId}</li>
                    <li>DELETE /user/{userId}/education/{educationId}</li>
                </ul>
            
                <h2>Experience</h2>
                <ul>
                    <li>GET /user/{userId}/experience</li>
                    <li>GET /user/{userId}/experience/{experienceId}</li>
                    <li>POST /user/{userId}/experience</li>
                    <li>PUT /user/{userId}/experience/{experienceId}</li>
                    <li>DELETE /user/{userId}/experience/{experienceId}</li>
                </ul>
            
                <h2>Skill</h2>
                <ul>
                    <li>GET /user/{userId}/skill</li>
                    <li>GET /user/{userId}/skill/{skillId}</li>
                    <li>POST /user/{userId}/skill</li>
                    <li>PUT /user/{userId}/skill/{skillId}</li>
                    <li>DELETE /user/{userId}/skill/{skillId}</li>
                </ul>
            
                <h2>Project</h2>
                <ul>
                    <li>GET /user/{userId}/project</li>
                    <li>GET /user/{userId}/project/{projectId}</li>
                    <li>POST /user/{userId}/project</li>
                    <li>PUT /user/{userId}/project/{projectId}</li>
                    <li>DELETE /user/{userId}/project/{projectId}</li>
                </ul>
            
                <h2>TechStack</h2>
                <ul>
                    <li>GET /user/{userId}/project/{projectId}/techStack</li>
                    <li>POST /user/{userId}/project/{projectId}/techStack</li>
                    <li>DELETE /user/{userId}/project/{projectId}/techStack/{techStackId}</li>
                </ul>
            
                <h2>Contact</h2>
                <ul>
                    <li>GET /user/{userId}/contact</li>
                    <li>POST /user/{userId}/contact</li>
                    <li>PUT /user/{userId}/contact</li>
                    <li>DELETE /user/{userId}/contact</li>
                </ul>
            
                <h2>SocialLink</h2>
                <ul>
                    <li>GET /user/{userId}/contact/socialLink</li>
                    <li>POST /user/{userId}/contact/socialLink</li>
                    <li>DELETE /user/{userId}/contact/socialLink/{socialLinkId}</li>
                </ul>
            
                <script>
                    function toggleMode() {
                        const body = document.body;
                        const isDark = body.classList.contains('dark-mode');
                        body.classList.toggle('dark-mode', !isDark);
                        body.classList.toggle('light-mode', isDark);
                    }
                </script>
            
            </body>
            </html>
            """.trimIndent()

        return ResponseEntity.ok(html)
    }
}
