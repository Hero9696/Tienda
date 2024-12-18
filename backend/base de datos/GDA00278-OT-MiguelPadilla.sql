-- Tabla Rol
CREATE TABLE Rol (
    idRol INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(50) NOT NULL
);

-- Tabla Estados
CREATE TABLE Estados (
    idEstados INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(50) NOT NULL
);

-- Tabla Clientes
CREATE TABLE Clientes (
    idClientes INT PRIMARY KEY IDENTITY(1,1),
    razon_social NVARCHAR(100),
    nombre_comercial NVARCHAR(100),
    direccion_entrega NVARCHAR(200),
    telefono NVARCHAR(15),
    email NVARCHAR(100)
);

-- Tabla Usuarios
CREATE TABLE Usuarios (
    idUsuarios INT PRIMARY KEY IDENTITY(1,1),
    rol_idRol INT FOREIGN KEY REFERENCES Rol(idRol),
    estados_idEstados INT FOREIGN KEY REFERENCES Estados(idEstados),
    correo_electronico NVARCHAR(100) NOT NULL,
    nombre_completo NVARCHAR(100),
    password NVARCHAR(100),
    telefono NVARCHAR(15),
    fecha_nacimiento DATE,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    clientes_idClientes INT FOREIGN KEY REFERENCES Clientes(idClientes)
);

-- Tabla CategoriaProductos
CREATE TABLE CategoriaProductos (
    idCategoriaProductos INT PRIMARY KEY IDENTITY(1,1),
    usuarios_idUsuarios INT FOREIGN KEY REFERENCES Usuarios(idUsuarios),
    estados_idEstados INT FOREIGN KEY REFERENCES Estados(idEstados),
    nombre NVARCHAR(50) NOT NULL,
    fecha_creacion DATETIME DEFAULT GETDATE()
);

-- Tabla Productos
CREATE TABLE Productos (
    idProductos INT PRIMARY KEY IDENTITY(1,1),
    categoriaProductos_idCategoriaProductos INT FOREIGN KEY REFERENCES CategoriaProductos(idCategoriaProductos),
    usuarios_idUsuarios INT FOREIGN KEY REFERENCES Usuarios(idUsuarios),
    nombre NVARCHAR(100),
    marca NVARCHAR(50),
    codigo NVARCHAR(50),
    stock INT,
    estados_idEstados INT FOREIGN KEY REFERENCES Estados(idEstados),
    precio DECIMAL(10, 2),
    fecha_creacion DATETIME DEFAULT GETDATE()
);
-- Modificacion De La Tabla Productos 
ALTER TABLE Productos
ADD foto VARBINARY(MAX);

-- Tabla Orden
CREATE TABLE Orden (
    idOrden INT PRIMARY KEY IDENTITY(1,1),
    usuarios_idUsuarios INT FOREIGN KEY REFERENCES Usuarios(idUsuarios),
    estados_idEstados INT FOREIGN KEY REFERENCES Estados(idEstados),
    fecha_creacion DATETIME DEFAULT GETDATE(),
    nombre_completo NVARCHAR(100),
    direccion NVARCHAR(200),
    telefono NVARCHAR(15),
    correo_electronico NVARCHAR(100),
    fecha_entrega DATE,
    total_orden DECIMAL(10, 2)
);

-- Tabla OrdenDetalles
CREATE TABLE OrdenDetalles (
    idOrdenDetalles INT PRIMARY KEY IDENTITY(1,1),
    orden_idOrden INT FOREIGN KEY REFERENCES Orden(idOrden),
    productos_idProductos INT FOREIGN KEY REFERENCES Productos(idProductos),
    cantidad INT,
    precio DECIMAL(10, 2),
    subtotal DECIMAL(10, 2)
);


--INSERTAR DATOS A LAS TABLAS

-- Insertar Roles
INSERT INTO Rol (nombre) VALUES ('Administrador'), ('Cliente');

-- Insertar Estados
INSERT INTO Estados (nombre) VALUES ('Activo'), ('Inactivo');

-- Insertar Clientes
INSERT INTO Clientes (razon_social, nombre_comercial, direccion_entrega, telefono, email)
VALUES 
('Empresa 1', 'Comercial 1', 'Calle Falsa 123', '1234567890', 'empresa1@correo.com'),
('Empresa 2', 'Comercial 2', 'Calle Verdadera 456', '0987654321', 'empresa2@correo.com');

-- Insertar Usuarios
INSERT INTO Usuarios (rol_idRol, estados_idEstados, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, clientes_idClientes)
VALUES 
(1, 1, 'admin@correo.com', 'Admin User', 'password123', '1234567890', '1980-01-01', NULL),
(2, 1, 'cliente@correo.com', 'Cliente User', 'password123', '0987654321', '1990-01-01', 1);

-- Insertar Categorías de Productos
INSERT INTO CategoriaProductos (usuarios_idUsuarios, estados_idEstados, nombre)
VALUES 
(1, 1, 'Electrónica'),
(1, 1, 'Ropa'),
(1, 1, 'Hogar');

-- Insertar Productos
INSERT INTO Productos (categoriaProductos_idCategoriaProductos, usuarios_idUsuarios, nombre, marca, codigo, stock, estados_idEstados, precio)
VALUES 
(1, 1, 'Televisor 4K', 'Sony', 'TV123', 10, 1, 500.00),
(1, 1, 'Smartphone', 'Samsung', 'SP456', 20, 1, 800.00),
(1, 1, 'Laptop', 'Dell', 'LP789', 15, 1, 1000.00),
(2, 1, 'Camisa', 'Levis', 'CM101', 50, 1, 20.00),
(2, 1, 'Pantalón', 'Wrangler', 'PN202', 30, 1, 25.00),
(2, 1, 'Zapatos', 'Nike', 'ZP303', 40, 1, 60.00),
(3, 1, 'Licuadora', 'Oster', 'LC404', 25, 1, 35.00),
(3, 1, 'Refrigerador', 'LG', 'RF505', 10, 1, 700.00),
(3, 1, 'Microondas', 'Whirlpool', 'MW606', 15, 1, 120.00),
(1, 1, 'Auriculares', 'Bose', 'AU701', 25, 1, 150.00),
(1, 1, 'Tablet', 'Apple', 'TB802', 10, 1, 900.00),
(2, 1, 'Vestido', 'Zara', 'VS903', 20, 1, 45.00),
(2, 1, 'Chaqueta', 'Adidas', 'CH004', 30, 1, 80.00),
(3, 1, 'Batidora', 'Hamilton Beach', 'BT105', 18, 1, 50.00);

SELECT * FROM Productos;

--- CRECACIÓN DE PROCEDIMIENTOS ---

-- Insertar en la Tabla Rol
CREATE PROCEDURE InsertarRol 
@nombre NVARCHAR(50)
AS
BEGIN
INSERT INTO Rol(nombre) VALUES(@nombre);
END;


-- Insertar en la Tabla Estados
CREATE PROCEDURE InsertarEstados
@nombre NVARCHAR(50)
AS 
BEGIN
INSERT INTO Estados(nombre) VALUES(@nombre);
END;


--Insertat en la Tabla Clientes
CREATE PROCEDURE InsertarClientes 
    @razon_social NVARCHAR(100),
    @nombre_comercial NVARCHAR(100),
    @direccion_entrega NVARCHAR(200),
    @telefono NVARCHAR(15),
    @email NVARCHAR(100)
AS
BEGIN
INSERT INTO Clientes (razon_social, nombre_comercial, direccion_entrega, telefono, email)
VALUES (@razon_social,@nombre_comercial,@direccion_entrega,@telefono,@email);
END;

--Insertar en la Tabla Usuarios
CREATE PROCEDURE InsertarUsuarios 
    @rol_idRol INT,
    @estados_idEstados INT,
    @correo_electronico NVARCHAR(100),
    @nombre_completo NVARCHAR(100),
    @password NVARCHAR(100),
    @telefono NVARCHAR(15),
    @fecha_nacimiento DATE,
    @clientes_idClientes INT
AS
BEGIN
 INSERT INTO Usuarios (rol_idRol, estados_idEstados, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, fecha_creacion, clientes_idClientes)
VALUES (@rol_idRol,@estados_idEstados,@correo_electronico,@nombre_completo,@password,@telefono,@fecha_nacimiento,GETDATE(),@clientes_idClientes);
END;

-- Insertar en la Tabla CategoriaProductos
CREATE PROCEDURE InsertarCategoriaProductos
    @usuarios_idUsuarios INT,
    @estados_idEstados INT,
    @nombre NVARCHAR(50)
AS
BEGIN
INSERT INTO CategoriaProductos (usuarios_idUsuarios, estados_idEstados, nombre)
VALUES (@usuarios_idUsuarios,@estados_idEstados,@nombre);
END;

-- Insertar en la Tabla Productos
CREATE PROCEDURE InsertarProductos 
    @categoriaProductos_idCategoriaProductos INT ,
    @usuarios_idUsuarios INT,
    @nombre NVARCHAR(100),
    @marca NVARCHAR(50),
    @codigo NVARCHAR(50),
    @stock INT,
    @estados_idEstados INT,
    @precio DECIMAL(10, 2)
AS
BEGIN
INSERT INTO Productos (categoriaProductos_idCategoriaProductos, usuarios_idUsuarios, nombre, marca, codigo, stock, estados_idEstados, precio,fecha_creacion)
VALUES(@categoriaProductos_idCategoriaProductos,@usuarios_idUsuarios,@nombre,@marca,@codigo,@stock,@estados_idEstados,@precio,GETDATE());
END;

-- Insertar en la Tabla Orden
CREATE PROCEDURE InsertarOrden 
    @usuarios_idUsuarios INT,
    @estados_idEstados INT ,
    @nombre_completo NVARCHAR(100),
    @direccion NVARCHAR(200),
    @telefono NVARCHAR(15),
    @correo_electronico NVARCHAR(100),
    @fecha_entrega DATE,
    @total_orden DECIMAL(10, 2)
AS
BEGIN
INSERT INTO Orden (usuarios_idUsuarios, estados_idEstados, fecha_creacion, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, total_orden)
VALUES (@usuarios_idUsuarios,@estados_idEstados,GETDATE(),@nombre_completo,@direccion,@telefono,@correo_electronico,@fecha_entrega,@total_orden);
END;

--Insertar en la Tabla OrdenDetalles
CREATE PROCEDURE InsertarOrdenDetalles
    @orden_idOrden INT,
    @productos_idProductos INT,
    @cantidad INT,
    @precio DECIMAL(10, 2),
    @subtotal DECIMAL(10, 2)
AS
BEGIN
    INSERT INTO OrdenDetalles (orden_idOrden, productos_idProductos, cantidad, precio, subtotal)
    VALUES (@orden_idOrden, @productos_idProductos, @cantidad, @precio, @subtotal);
END;


-- Actualizar en la Tabla Rol
CREATE PROCEDURE ActualizarRol 
@idRol INT,
@nombre NVARCHAR(50)
AS
BEGIN
UPDATE Rol SET nombre=@nombre WHERE idRol=@idRol;
END;

-- Actualizar en la Tabla Estados
CREATE PROCEDURE ActualizarEstados
@idEstados INT,
@nombre NVARCHAR(50)
AS 
BEGIN
UPDATE Estados SET nombre = @nombre WHERE @idEstados=idEstados;
END;


--Actualizar en la Tabla Clientes
CREATE PROCEDURE ActualizarClientes
	@idClientes INT,
    @razon_social NVARCHAR(100),
    @nombre_comercial NVARCHAR(100),
    @direccion_entrega NVARCHAR(200),
    @telefono NVARCHAR(15),
    @email NVARCHAR(100)
AS
BEGIN
UPDATE Clientes
SET razon_social=@razon_social,
	nombre_comercial=@nombre_comercial,
	direccion_entrega=@direccion_entrega,
	telefono=@telefono,
	email=@email
WHERE idClientes=@idClientes;
END;

--Actualizar en la Tabla Usuarios
CREATE PROCEDURE ActualizarUsuarios 
	@idUsuarios INT,
    @rol_idRol INT,
    @estados_idEstados INT,
    @correo_electronico NVARCHAR(100),
    @nombre_completo NVARCHAR(100),
    @password NVARCHAR(100),
    @telefono NVARCHAR(15),
    @fecha_nacimiento DATE,
    @clientes_idClientes INT
AS
BEGIN
 UPDATE Usuarios
 SET rol_idRol=@rol_idRol,
	estados_idEstados=@estados_idEstados,
	correo_electronico=@correo_electronico,
	nombre_completo=@nombre_completo,
	password= @password ,
    telefono=@telefono ,
    fecha_nacimiento=@fecha_nacimiento ,
    clientes_idClientes=@clientes_idClientes 
	WHERE idUsuarios=@idUsuarios;
END;

-- Actualizar en la Tabla CategoriaProductos
CREATE PROCEDURE ActualizarCategoriaProductos
	@idCategoriaProductos INT,
    @usuarios_idUsuarios INT,
    @estados_idEstados INT,
    @nombre NVARCHAR(50)
AS
BEGIN
UPDATE CategoriaProductos 
SET usuarios_idUsuarios=@usuarios_idUsuarios,
	estados_idEstados=@estados_idEstados,
	nombre=@nombre
	WHERE idCategoriaProductos=@idCategoriaProductos;
END;

-- Actualizar en la Tabla Productos
CREATE PROCEDURE ActualizarProductos 
	@idProductos INT,
    @categoriaProductos_idCategoriaProductos INT ,
    @usuarios_idUsuarios INT,
    @nombre NVARCHAR(100),
    @marca NVARCHAR(50),
    @codigo NVARCHAR(50),
    @stock INT,
    @estados_idEstados INT,
    @precio DECIMAL(10, 2)
AS
BEGIN
UPDATE Productos 
SET categoriaProductos_idCategoriaProductos= @categoriaProductos_idCategoriaProductos,
   usuarios_idUsuarios= @usuarios_idUsuarios,
   nombre= @nombre,
   marca= @marca,
   codigo= @codigo,
   stock= @stock,
   estados_idEstados= @estados_idEstados,
   precio= @precio
   WHERE idProductos=@idProductos;
END;

-- Actualizar en la Tabla Orden
CREATE PROCEDURE ActualizarOrden 
	@idOrden INT,
    @usuarios_idUsuarios INT,
    @estados_idEstados INT ,
    @nombre_completo NVARCHAR(100),
    @direccion NVARCHAR(200),
    @telefono NVARCHAR(15),
    @correo_electronico NVARCHAR(100),
    @fecha_entrega DATE,
    @total_orden DECIMAL(10, 2)
AS
BEGIN
UPDATE Orden
SET usuarios_idUsuarios=@usuarios_idUsuarios,
	estados_idEstados=@estados_idEstados,
	nombre_completo=@nombre_completo,
	direccion=@direccion,
	telefono=@telefono,
	correo_electronico=@correo_electronico,
	fecha_entrega=@fecha_entrega,
	total_orden=@total_orden
	WHERE idOrden=@idOrden;
END;

--Actualizar en la Tabla OrdenDetalles
CREATE PROCEDURE ActualizarOrdenDetalles
	@idOrdenDetalles INT,
    @orden_idOrden INT,
    @productos_idProductos INT,
    @cantidad INT,
    @precio DECIMAL(10, 2),
    @subtotal DECIMAL(10, 2)
AS
BEGIN
   UPDATE OrdenDetalles
   SET  orden_idOrden=@orden_idOrden,
   productos_idProductos=@productos_idProductos,
   cantidad=@cantidad,
   precio=@precio,
   subtotal=@subtotal
   WHERE idOrdenDetalles=@idOrdenDetalles;
END;

--Activar o Desactivar Productos
CREATE PROCEDURE EstadosDeProductos
    @idProducto INT,  
    @idEstado INT      
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Productos WHERE idProductos = @idProducto)
    BEGIN
        UPDATE Productos
        SET estados_idEstados = @idEstado
        WHERE idProductos = @idProducto;

        PRINT 'Producto inactivado exitosamente.';
    END
    ELSE
    BEGIN
        PRINT 'El producto especificado no existe.';
    END
END;
--MODIFICACION DE ACTIVAR O DESACTIVAR PRODUCTOS--
CREATE PROCEDURE AlternarEstadoProducto
    @idProductos INT
AS
BEGIN
    DECLARE @estadoActual INT;

    -- Obtener el estado actual del producto
    SELECT @estadoActual = estados_idEstados
    FROM Productos
    WHERE idProductos = @idProductos;

    -- Verificar si el estado es 'activo' (suponiendo que '1' es el ID de estado activo)
    -- y cambiarlo a 'inactivo' (suponiendo que '2' es el ID de estado inactivo), o viceversa.
    IF @estadoActual = 1
    BEGIN
        -- Cambiar el estado a inactivo (ID 2)
        UPDATE Productos
        SET estados_idEstados = 2
        WHERE idProductos = @idProductos;
    END
    ELSE IF @estadoActual = 2
    BEGIN
        -- Cambiar el estado a activo (ID 1)
        UPDATE Productos
        SET estados_idEstados = 1
        WHERE idProductos = @idProductos;
    END
    ELSE
    BEGIN
        -- Si el estado no es ni activo ni inactivo, puedes manejarlo aquí si es necesario
        PRINT 'El estado del producto no es reconocido.'
    END
END


--VISTAS DE CONSULTAS---

-- Total de Productos activos que tenga en stock mayor a 0 --

CREATE VIEW Vista_ProductosActivosConStock AS
SELECT 
    FROM * AS TotalProductosActivos
FROM 
    Productos
WHERE 
    estados_idEstados = (SELECT idEstados FROM Estados WHERE nombre = 'Activo') -- Asumiendo que "Activo" es el nombre del estado
    AND stock > 0;






-- Total de Quetzales en ordenes ingresadas en el mes de Agosto 2024 --
CREATE VIEW Vista_TotalOrdenesAgosto2024 AS
SELECT 
    SUM(total_orden) AS TotalQuetzales
FROM 
    Orden
WHERE 
    MONTH(fecha_creacion) = 8 -- Mes de Agosto
    AND YEAR(fecha_creacion) = 2024;

-- Top 10 de clientes con Mayor consumo de ordenes de todo el histórico --
CREATE VIEW Vista_Top10ClientesMayorConsumo AS
SELECT TOP 10
    C.idClientes,
    C.razon_social,
    C.nombre_comercial,
    SUM(O.total_orden) AS TotalConsumo
FROM 
    Clientes C
INNER JOIN 
    Usuarios U ON C.idClientes = U.clientes_idClientes
INNER JOIN 
    Orden O ON U.idUsuarios = O.usuarios_idUsuarios
GROUP BY 
    C.idClientes, C.razon_social, C.nombre_comercial
ORDER BY 
    TotalConsumo DESC;



-- Top 10 de productos más vendidos en orden ascendente --

CREATE VIEW Vista_Top10ProductosMasVendidos AS
SELECT TOP 10
    P.idProductos,
    P.nombre AS NombreProducto,
    SUM(OD.cantidad) AS TotalVendidos
FROM 
    Productos P
INNER JOIN 
    OrdenDetalles OD ON P.idProductos = OD.productos_idProductos
GROUP BY 
    P.idProductos, P.nombre
ORDER BY 
    TotalVendidos ASC;



--EJEMPLOS DE PROCEDIMIENTOS--

--Procedimiento de InsertartProducto--
EXEC InsertarProductos 
    @categoriaProductos_idCategoriaProductos = 1,
    @usuarios_idUsuarios = 2,
    @nombre = 'Laptop Dell XPS 13',
    @marca = 'Dell',
    @codigo = 'XPS13-2024',
    @stock = 15,
    @estados_idEstados = 1, 
    @precio = 15000.00;


--Procedimiento de ActualizarProducto--
	EXEC ActualizarProductos 
    @idProductos = 1,
    @categoriaProductos_idCategoriaProductos = 1,
    @usuarios_idUsuarios = 2,
    @nombre = 'Laptop Dell XPS 15',
    @marca = 'Dell',
    @codigo = 'XPS15-2024',
    @stock = 10,
    @estados_idEstados = 1,
    @precio = 20000.00;


	