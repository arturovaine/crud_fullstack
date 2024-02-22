
-- TRUNCATE TABLE public.categoria;

INSERT IGNORE INTO public.categoria (
	categoria_id serial NOT NULL,
	nome_categoria varchar(20) NULL,
	descricao_categoria varchar(200) NULL,
) VALUES 
(1001, 'Skincare', 'Produtos para cuidados com a pele, incluindo limpeza, hidratação e tratamento.'),
(1002, 'Maquiagem', 'Produtos para maquiagem, incluindo base, sombra, batom e mais.'),
(1003, 'Cabelos', 'Produtos para cuidados com os cabelos, incluindo shampoos, condicionadores e tratamentos.'),
(1004, 'Corpo', 'Produtos para cuidados com o corpo, incluindo sabonetes, hidratantes e esfoliantes.'),
(1005, 'Perfumaria', 'Perfumes e colônias para todos os gostos e ocasiões.'),
(1006, 'Acessórios', 'Acessórios para maquiagem e cuidados pessoais, incluindo pincéis e esponjas.'),
(1007, 'Unhas', 'Esmaltes e tratamentos para unhas.'),
(1008, 'Solar', 'Protetores solares e produtos para cuidados pós-sol.'),
(1009, 'Capilar', 'Tratamentos e estilizadores para todos os tipos de cabelo.'),
(1010, 'Natural', 'Produtos com ingredientes naturais e orgânicos.');

-- TRUNCATE TABLE public.cliente;

INSERT IGNORE INTO public.cliente (
	cliente_id serial NOT NULL,
	email varchar(50) NULL,
	username varchar(15) NULL,
	senha varchar(20) NULL,
	nome varchar(200) NULL,
	cpf varchar(11) NOT NULL,
	telefone varchar(11) NULL,
	data_nascimento date NULL,
	endereco_id int4 NOT NULL,
	CONSTRAINT cliente_cpf_key UNIQUE (cpf),
) VALUES 
(2001, 'cliente01@email.com', 'cliente01', 'senha01', 'Cliente Um', '00000000001', '11987654321', '1990-01-01', 3001),
(2002, 'cliente02@email.com', 'cliente02', 'senha02', 'Cliente Dois', '00000000002', '11987654322', '1991-02-02', 3002),
(2003, 'cliente03@email.com', 'cliente03', 'senha03', 'Cliente Três', '00000000003', '11987654323', '1992-03-03', 3003),
(2004, 'cliente04@email.com', 'cliente04', 'senha04', 'Cliente Quatro', '00000000004', '11987654324', '1993-04-04', 3004),
(2005, 'cliente05@email.com', 'cliente05', 'senha05', 'Cliente Cinco', '00000000005', '11987654325', '1994-05-05', 3005),
(2006, 'cliente06@email.com', 'cliente06', 'senha06', 'Cliente Seis', '00000000006', '11987654326', '1995-06-06', 3006),
(2007, 'cliente07@email.com', 'cliente07', 'senha07', 'Cliente Sete', '00000000007', '11987654327', '1996-07-07', 3007),
(2008, 'cliente08@email.com', 'cliente08', 'senha08', 'Cliente Oito', '00000000008', '11987654328', '1997-08-08', 3008),
(2009, 'cliente09@email.com', 'cliente09', 'senha09', 'Cliente Nove', '00000000009', '11987654329', '1998-09-09', 3009),
(2010, 'cliente10@email.com', 'cliente10', 'senha10', 'Cliente Dez', '00000000010', '11987654330', '1999-10-10', 3010);

-- TRUNCATE TABLE public.endereco;

INSERT IGNORE INTO public.endereco (
	endereco_id serial NOT NULL,
	cep varchar(9) NULL,
	rua varchar(100) NULL,
	bairro varchar(30) NULL,
	cidade varchar(30) NULL,
	numero varchar(10) NULL,
	complemento varchar(100) NULL,
	uf varchar(2) NULL,
) VALUES 
(3001, '01000-000', 'Rua Um', 'Bairro Um', 'Cidade Um', '1', 'Apto 1', 'SP'),
(3002, '02000-000', 'Rua Dois', 'Bairro Dois', 'Cidade Dois', '2', 'Apto 2', 'RJ'),
(3003, '03000-000', 'Rua Três', 'Bairro Três', 'Cidade Três', '3', 'Apto 3', 'MG'),
(3004, '04000-000', 'Rua Quatro', 'Bairro Quatro', 'Cidade Quatro', '4', 'Apto 4', 'ES'),
(3005, '05000-000', 'Rua Cinco', 'Bairro Cinco', 'Cidade Cinco', '5', 'Apto 5', 'RS'),
(3006, '06000-000', 'Rua Seis', 'Bairro Seis', 'Cidade Seis', '6', 'Apto 6', 'PR'),
(3007, '07000-000', 'Rua Sete', 'Bairro Sete', 'Cidade Sete', '7', 'Apto 7', 'SC'),
(3008, '08000-000', 'Rua Oito', 'Bairro Oito', 'Cidade Oito', '8', 'Apto 8', 'BA'),
(3009, '09000-000', 'Rua Nove', 'Bairro Nove', 'Cidade Nove', '9', 'Apto 9', 'PE'),
(3010, '10000-000', 'Rua Dez', 'Bairro Dez', 'Cidade Dez', '10', 'Apto 10', 'CE');

-- TRUNCATE TABLE public.pedido;

INSERT IGNORE INTO public.pedido (
	pedido_id serial NOT NULL,
	numero_pedido int4 NULL,
	valor_total_pedido numeric NULL,
	data_pedido date NOT NULL DEFAULT now(),
	status bool NULL,
	cliente_id int4 NOT NULL,
) VALUES 
(1, 4001, 100.00, '2024-01-01', TRUE, 1),
(2, 4002, 200.00, '2024-01-02', TRUE, 2),
(3, 4003, 300.00, '2024-01-03', TRUE, 3),
(4, 4004, 400.00, '2024-01-04', TRUE, 4),
(5, 4005, 500.00, '2024-01-05', TRUE, 5),
(6, 4006, 600.00, '2024-01-06', TRUE, 6),
(7, 4007, 700.00, '2024-01-07', TRUE, 7),
(8, 4008, 800.00, '2024-01-08', TRUE, 8),
(9, 4009, 900.00, '2024-01-09', TRUE, 9),
(10, 4010, 1000.00, '2024-01-10', TRUE, 10);

-- TRUNCATE TABLE public.produto;

INSERT IGNORE INTO public.produto (
	produto_id serial NOT NULL,
	nome_produto varchar(50) NULL,
	descricao_produto varchar(200) NULL,
	preco_produto numeric NULL,
	qtd_estoque int4 NULL,
	data_cadastro_produto date NULL DEFAULT now(),
	categoria_id int4 NOT NULL,
	imagem varchar NULL
) VALUES 
(5001, 'Creme Hidratante Facial', 'Creme hidratante para todos os tipos de pele. 50ml', 89.90, 100, '2024-01-01', 1, 'creme_hidratante_facial_5001.jpg'),
(5002, 'Base Líquida HD', 'Base líquida de alta definição para uma cobertura uniforme. 30ml', 120.00, 50, '2024-01-02', 2, 'base_liquida_hd_5002.jpg'),
(5003, 'Shampoo Hidratante', 'Shampoo para cabelos secos e danificados. 300ml', 45.00, 150, '2024-01-03', 3, 'shampoo_hidratante_5003.jpg'),
(5004, 'Esfoliante Corporal', 'Esfoliante para remover células mortas e revitalizar a pele. 200ml', 60.00, 100, '2024-01-04', 4, 'esfoliante_corporal_5004.jpg'),
(5005, 'Perfume Elegance', 'Perfume com notas florais e amadeiradas para o dia e a noite. 50ml', 150.00, 75, '2024-01-05', 5, 'perfume_elegance_5005.jpg'),
(5006, 'Kit de Pincéis Profissionais', 'Conjunto de pincéis para aplicação de maquiagem. Inclui 5 peças', 200.00, 50, '2024-01-06', 6, 'kit_pinceis_profissionais_5006.jpg'),
(5007, 'Esmalte Longa Duração', 'Esmalte com fórmula avançada para maior durabilidade. 10ml', 25.00, 200, '2024-01-07', 7, 'esmalte_longa_duracao_5007.jpg'),
(5008, 'Protetor Solar FPS 50', 'Proteção solar alta para uso diário. Resistente à água. 100ml', 90.00, 120, '2024-01-08', 8, 'protetor_solar_fps50_5008.jpg'),
(5009, 'Máscara Capilar Reconstrutora', 'Tratamento intensivo para cabelos danificados. 250ml', 75.00, 80, '2024-01-09', 9, 'mascara_capilar_reconstrutora_5009.jpg'),
(5010, 'Sabonete Facial Natural', 'Sabonete líquido facial com ingredientes naturais. 150ml', 55.00, 100, '2024-01-10', 10, 'sabonete_facial_natural_5010.jpg');

-- TRUNCATE TABLE public.produto_pedido;

INSERT IGNORE INTO public.produto_pedido (
	produto_pedido_id serial NOT NULL,
	qtd_produto_pedido int4 NULL,
	preco_produto_pedido numeric NULL,
	produto_id int4 NULL,
	pedido_id int4 NULL,
) VALUES 
(6001, 1, 10.00, 5001, 1),
(6002, 2, 20.00, 5002, 2),
(6003, 3, 30.00, 5003, 3),
(6004, 4, 40.00, 5004, 4),
(6005, 5, 50.00, 5005, 5),
(6006, 6, 60.00, 5006, 6),
(6007, 7, 70.00, 5007, 7),
(6008, 8, 80.00, 5008, 8),
(6009, 9, 90.00, 5009, 9),
(6010, 10, 100.00, 5010, 10);
