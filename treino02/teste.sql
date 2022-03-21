CREATE TABLE usuarios(
    nome VARCHAR(50), 
    email VARCHAR(100),
    idade INT
);

INSERT INTO usuarios(nome, email, idade) VALUES (
    'João',
    'joao@email.com',
    40
);

INSERT INTO usuarios(nome, email, idade) VALUES (
    'Maria',
    'maria@email.com',
    18
);

INSERT INTO usuarios(nome, email, idade) VALUES (
    'Joanete',
    'joanete@email.com',
    31
);

INSERT INTO usuarios(nome, email, idade) VALUES (
    'Alberto',
    'alberto@email.com',
    18
);


SELECT * FROM usuarios WHERE idade = 18;

SELECT * FROM usuarios WHERE nome = "João";

SELECT * FROM usuarios WHERE idade >= 18;

DELETE FROM usuarios WHERE nome = "João";

UPDATE usuarios SET nome = "Joaquina" WHERE nome = "Maria";