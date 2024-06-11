# -*- encoding: utf-8 -*-
"""
Copyright (c) 2024 - present bcstechnologies.com
"""

from api import app, db

@app.shell_context_processor
def make_shell_context():
    return {"app": app,
            "db": db
            }

if __name__ == '__main__':
    context = ('/etc/letsencrypt/live/leadconnectai.in/fullchain.pem', '/etc/letsencrypt/live/leadconnectai.in/privkey.pem')
    app.run(debug=True, host="leadconnectai.in", ssl_context=context)
