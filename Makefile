.PHONY: setup-front-end setup-back-end start-front-end start-back-end

setup-front-end:
	cd front-end && npm install

setup-back-end:
	@PYTHONPATH=. -m venv venv && . venv/bin/activate && pip install fastapi uvicorn langchain openai

start-front-end:
	cd front-end && npm run start

start-back-end:
	cd back-end && python3 lang_server.py

## Code quality check for main folder
checks:
	@vulture --sort-by-size --min-confidence 80 .
	@find . -type f -name "*.py" | xargs pylint --rcfile=python.pylintrc --fail-under=8
	@bandit -r ai-powered-app

test:
	cd tests && python3 test-openai.py

setup: setup-front-end setup-back-end

start: start-front-end start-back-end

#start-back-end:
#	. venv/bin/activate && uvicorn main:app --reload