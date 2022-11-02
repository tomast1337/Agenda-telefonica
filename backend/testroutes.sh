curl --request GET \
  --url http://localhost:3000/api/agenda/2

curl --request GET \
  --url http://localhost:3000/api/agenda/nome/Alterada

curl --request DELETE \
  --url http://localhost:3000/api/agenda/5

curl --request GET \
  --url http://localhost:3000/api/agenda

curl --request POST \
  --url http://localhost:3000/api/agenda \
  --header 'Content-Type: application/json' \
  --data '{
	"nome":"Agenda 1",
	"descricao":"Essa é uma agenda"
}'

curl --request PUT \
  --url http://localhost:3000/api/agenda/1 \
  --header 'Content-Type: application/json' \
  --data '{
	"nome":"Agenda Alterada",
	"descricao":"Essa é uma agenda que foi alterada"
}'