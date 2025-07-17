# API Routes

## portfolio

GET /portfolio  
GET /portfolio/[portfolioId]  
POST /portfolio  
PUT /portfolio/[portfolioId]  
DELETE /portfolio/[portfolioId]

## user

GET /user  
GET /user/[userId]  
POST /user  
PUT /user/[userId]  
DELETE /user/[userId]

## education

GET /user/[userId]/education  
GET /user/[userId]/education/[educationId]  
POST /user/[userId]/education  
PUT /user/[userId]/education/[educationId]  
DELETE /user/[userId]/education/[educationId]

## experience

GET /user/[userId]/experience  
GET /user/[userId]/experience/[experienceId]  
POST /user/[userId]/experience  
PUT /user/[userId]/experience/[experienceId]  
DELETE /user/[userId]/experience/[experienceId]

## skill

GET /user/[userId]/skill  
GET /user/[userId]/skill/[skillId]  
POST /user/[userId]/skill  
PUT /user/[userId]/skill/[skillId]  
DELETE /user/[userId]/skill/[skillId]

## project

GET /user/[userId]/project  
GET /user/[userId]/project/[projectId]  
POST /user/[userId]/project  
PUT /user/[userId]/project/[projectId]  
DELETE /user/[userId]/project/[projectId]

## techStack

GET /user/[userId]/project/[projectId]/techStack  
POST /user/[userId]/project/[projectId]/techStack  
DELETE /user/[userId]/project/[projectId]/techStack/:techStackId

## contact

GET /user/[userId]/contact  
POST /user/[userId]/contact  
PUT /user/[userId]/contact  
DELETE /user/[userId]/contact

## socialLink

GET /user/[userId]/contact/socialLink  
POST /user/[userId]/contact/socialLink  
DELETE /user/[userId]/contact/socialLink/[socialLinkId]
