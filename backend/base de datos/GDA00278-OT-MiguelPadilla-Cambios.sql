	-- Se modifico la vista Productos Activos--
ALTER VIEW Vista_ProductosActivosConStock AS
SELECT 
	p.idProductos,
    p.nombre,
	p.marca,
    p.precio,
    p.stock,
	p.foto
FROM 
    Productos p
WHERE 
    p.estados_idEstados = (SELECT idEstados FROM Estados WHERE nombre = 'Activo') -- Solo productos activos
    AND p.stock > 0; -- Con stock mayor a 0

-- Modificacion De La Tabla Productos-- 
ALTER TABLE Productos
ADD foto NVARCHAR(MAX);


--MODIFICACION DEL PROCEDIMIENTO INSERTAR PRODUCTO--
ALTER PROCEDURE InsertarProductos 
    @categoriaProductos_idCategoriaProductos INT,
    @usuarios_idUsuarios INT,
    @nombre NVARCHAR(100),
    @marca NVARCHAR(50),
    @codigo NVARCHAR(50),
    @stock INT,
    @estados_idEstados INT,
    @precio DECIMAL(10, 2),
    @foto NVARCHAR(MAX) 
AS
BEGIN
    INSERT INTO Productos (categoriaProductos_idCategoriaProductos, usuarios_idUsuarios, nombre, marca, codigo, stock, estados_idEstados, precio, foto, fecha_creacion)
    VALUES (@categoriaProductos_idCategoriaProductos, @usuarios_idUsuarios, @nombre, @marca, @codigo, @stock, @estados_idEstados, @precio, @foto, GETDATE());
END;


--MODIFICACION DEL PROCEDIMIENTO ACTUALIZAR PRODUCTO---
ALTER PROCEDURE ActualizarProductos 
    @idProductos INT,
    @categoriaProductos_idCategoriaProductos INT,
    @usuarios_idUsuarios INT,
    @nombre NVARCHAR(100),
    @marca NVARCHAR(50),
    @codigo NVARCHAR(50),
    @stock INT,
    @estados_idEstados INT,
    @precio DECIMAL(10, 2),
    @foto NVARCHAR(MAX) 
AS
BEGIN
    UPDATE Productos 
    SET categoriaProductos_idCategoriaProductos = @categoriaProductos_idCategoriaProductos,
        usuarios_idUsuarios = @usuarios_idUsuarios,
        nombre = @nombre,
        marca = @marca,
        codigo = @codigo,
        stock = @stock,
        estados_idEstados = @estados_idEstados,
        precio = @precio,
        foto = @foto 
    WHERE idProductos = @idProductos;
END;

--MODIFICACION DE ACTIVAR O DESACTIVAR PRODUCTOS--
CREATE PROCEDURE AlternarEstadoProducto
    @idProductos INT
AS
BEGIN
    DECLARE @estadoActual INT;

    
    SELECT @estadoActual = estados_idEstados
    FROM Productos
    WHERE idProductos = @idProductos;

   
    IF @estadoActual = 1
    BEGIN
        
        UPDATE Productos
        SET estados_idEstados = 2
        WHERE idProductos = @idProductos;
    END
    ELSE IF @estadoActual = 2
    BEGIN
        
        UPDATE Productos
        SET estados_idEstados = 1
        WHERE idProductos = @idProductos;
    END
    ELSE
    BEGIN
       
        PRINT 'El estado del producto no es reconocido.'
    END
END

--CREACION DE VISTA PARA VISUALIZAR CATEGORIAS--
CREATE VIEW Vista_CategoriaProductosActivas AS
SELECT 
    cp.idCategoriaProductos,
    cp.nombre AS nombreCategoria,
    u.nombre_completo AS nombreUsuario,
    e.nombre AS nombreEstado,
    cp.fecha_creacion
FROM 
    CategoriaProductos cp
JOIN 
    Usuarios u ON cp.usuarios_idUsuarios = u.idUsuarios
JOIN 
    Estados e ON cp.estados_idEstados = e.idEstados
WHERE 
    e.nombre = 'Activo'; 

	-- VISTA PARA VER LA TABLA ORDEN --
	CREATE VIEW VerOrden AS
SELECT 
    o.idOrden,
    o.usuarios_idUsuarios,
    u.nombre_completo AS usuario_nombre_completo,
    u.telefono AS usuario_telefono,
    u.correo_electronico AS usuario_correo,
    o.estados_idEstados,
    e.nombre AS estado_nombre,
    o.fecha_creacion,
    o.nombre_completo AS orden_nombre_completo,
    o.direccion,
    o.telefono,
    o.correo_electronico,
    o.fecha_entrega,
    o.total_orden
FROM 
    Orden o
LEFT JOIN 
    Usuarios u ON o.usuarios_idUsuarios = u.idUsuarios
LEFT JOIN 
    Estados e ON o.estados_idEstados = e.idEstados;


	-- PROCEDIMIENTO ALMACENADO BASADO EN LA REUNION DEL LUNES 9 DE DICIEMBRE --
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE CrearOrdenDetalles
    @idUsuarios INT,
    @detalles NVARCHAR(MAX)
AS
BEGIN
    BEGIN TRANSACTION
    BEGIN TRY
        DECLARE @idOrden INT;

       
        IF NOT EXISTS (SELECT 1 FROM Orden WHERE usuarios_idUsuarios = @idUsuarios AND estados_idEstados = (SELECT idEstados FROM Estados WHERE nombre = 'Confirmado'))
        BEGIN
            
            INSERT INTO Orden (
                usuarios_idUsuarios,
                estados_idEstados,
                nombre_completo,
                direccion,
                telefono,
                correo_electronico
            )
            SELECT TOP 1
                u.idUsuarios AS usuarios_idUsuarios,
                (SELECT idEstados FROM Estados WHERE nombre = 'Confirmado'),
                u.nombre_completo,
                u.direccion,
                u.telefono,
                u.correo_electronico
            FROM Usuarios AS u
            WHERE u.idUsuarios = @idUsuarios;

            SET @idOrden = SCOPE_IDENTITY();
        END
        ELSE
        BEGIN
            
            SELECT @idOrden = idOrden
            FROM Orden
            WHERE usuarios_idUsuarios = @idUsuarios AND estados_idEstados = (SELECT idEstados FROM Estados WHERE nombre = 'Confirmado');
        END

       
        MERGE INTO OrdenDetalles AS target
        USING (
            SELECT 
                source.idProductos,   
                source.cantidad, 
                p.precio,  
                source.cantidad * p.precio AS subtotal
            FROM OPENJSON(@detalles)
            WITH (
                idProductos INT,
                cantidad INT
            ) AS source
            JOIN Productos AS p ON p.idProductos = source.idProductos  -- Obtener el precio
        ) AS source
        ON target.orden_idOrden = @idOrden AND target.productos_idProductos = source.idProductos  -- Se usa productos_idProductos
        WHEN MATCHED THEN
            UPDATE SET target.cantidad = target.cantidad + source.cantidad,
                       target.subtotal = (target.cantidad + source.cantidad) * target.precio
        WHEN NOT MATCHED THEN
            INSERT (orden_idOrden, productos_idProductos, cantidad, precio, subtotal)
            VALUES (@idOrden, source.idProductos, source.cantidad, source.precio, source.precio * source.cantidad); 

      
        UPDATE Orden
        SET total_orden = (
            SELECT SUM(subtotal)
            FROM OrdenDetalles
            WHERE orden_idOrden = @idOrden
        )
        WHERE idOrden = @idOrden;

    
        SELECT *
        FROM Vista_VerOrden
        WHERE idOrden = @idOrden;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END



-- CREACION DE USUARIO Y CLIENTE --

CREATE PROCEDURE RegistrarClienteYUsuario
    @razon_social NVARCHAR(100),
    @nombre_comercial NVARCHAR(100),
    @direccion_entrega NVARCHAR(200),
    @telefono NVARCHAR(15),
    @email NVARCHAR(100),
    @rol_idRol INT,
    @estados_idEstados INT,
    @correo_electronico NVARCHAR(100),
    @nombre_completo NVARCHAR(100),
    @password NVARCHAR(100),
    @telefono_usuario NVARCHAR(15),
    @fecha_nacimiento DATE
AS
BEGIN
    BEGIN TRY
        DECLARE @idCliente INT;

        
        INSERT INTO Clientes (razon_social, nombre_comercial, direccion_entrega, telefono, email)
        VALUES (@razon_social, @nombre_comercial, @direccion_entrega, @telefono, @email);

       
        SET @idCliente = SCOPE_IDENTITY();

        
        INSERT INTO Usuarios (rol_idRol, estados_idEstados, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, clientes_idClientes)
        VALUES (@rol_idRol, @estados_idEstados, @correo_electronico, @nombre_completo, @password, @telefono_usuario, @fecha_nacimiento, @idCliente);
        
       
        SELECT @idCliente AS idCliente;
    END TRY
    BEGIN CATCH
        
        SELECT ERROR_MESSAGE() AS ErrorMessage;
    END CATCH
END;


-- BUSCAR USUARIO POR CORREO --
CREATE PROCEDURE BuscarUsuarioPorCorreo
    @Correo NVARCHAR(100)
AS
BEGIN
    SELECT 
        correo_electronico, 
        nombre_completo, 
        password
    FROM Usuarios
    WHERE correo_electronico = @Correo;
END;

-- VER ROLES POR ID --
CREATE PROCEDURE VerRoles
    @idRol INT
AS
BEGIN
    SELECT idRol, nombre
    FROM Rol
    WHERE idRol = @idRol;
END;

--VER PRODUCTOS POR ID --
CREATE PROCEDURE VerProductoPorId
    @idProducto INT
AS
BEGIN
    SELECT idProductos, categoriaProductos_idCategoriaProductos, usuarios_idUsuarios, nombre, marca, codigo, stock, estados_idEstados, precio
    FROM Productos
    WHERE idProductos = @idProducto;
END;


-- VER ORDEDETALLES --
CREATE VIEW VerOrden AS
SELECT
    o.idOrden,
    o.usuarios_idUsuarios,
    o.nombre_completo,
    o.direccion,
    o.correo_electronico,
    o.estados_idEstados,
    e.nombre AS estado_orden,
    od.productos_idProductos,
    p.nombre AS nombre_producto,
    od.cantidad,
    od.precio,
    od.subtotal
FROM
    Orden o
JOIN
    Estados e ON o.estados_idEstados = e.idEstados
JOIN
    OrdenDetalles od ON o.idOrden = od.orden_idOrden
JOIN
    Productos p ON od.productos_idProductos = p.idProductos;

	-- VER ORDEDETALLES POR ID --
	ALTER PROCEDURE ObtenerOrdenPorId
    @usuarios_idUsuarios INT
AS
BEGIN
    SELECT
        o.idOrden,
        o.usuarios_idUsuarios,
        o.nombre_completo,
        o.direccion,
        o.correo_electronico,
        o.estados_idEstados,
        e.nombre AS estado_orden,
        od.productos_idProductos,
        p.nombre AS nombre_producto,
        od.cantidad,
        od.precio,
        od.subtotal
    FROM
        Orden o
    JOIN
        Estados e ON o.estados_idEstados = e.idEstados
    JOIN
        OrdenDetalles od ON o.idOrden = od.orden_idOrden
    JOIN
        Productos p ON od.productos_idProductos = p.idProductos
    WHERE
        o.usuarios_idUsuarios = @usuarios_idUsuarios;
END;


  -- PROCEDIMIENTO ACTUALIZAR ORDE DETALLES MODIFICADO --
ALTER PROCEDURE ActualizarOrdenDetalles
    @idOrden INT,
    @detalles NVARCHAR(MAX)
AS
BEGIN
    BEGIN TRANSACTION
    BEGIN TRY
        -- Tabla temporal para los nuevos detalles
        CREATE TABLE #DetallesTemporales (
            Productos_idProductos INT,
            cantidad INT
        );

        -- Insertar los detalles enviados al procedimiento en la tabla temporal
        INSERT INTO #DetallesTemporales (Productos_idProductos, cantidad)
        SELECT 
            Productos_idProductos, 
            cantidad
        FROM OPENJSON(@detalles)
        WITH (
            Productos_idProductos INT,
            cantidad INT
        );

        -- Eliminar los detalles que ya no existen en la nueva lista
        DELETE FROM OrdenDetalles
        WHERE orden_idOrden = @idOrden
          AND productos_idProductos NOT IN (SELECT Productos_idProductos FROM #DetallesTemporales);

        -- Actualizar o insertar los detalles enviados
        MERGE INTO OrdenDetalles AS target
        USING (
            SELECT Productos_idProductos, cantidad
            FROM #DetallesTemporales
        ) AS source
        ON target.orden_idOrden = @idOrden AND target.productos_idProductos = source.Productos_idProductos
        WHEN MATCHED THEN
            UPDATE SET target.cantidad = source.cantidad
        WHEN NOT MATCHED THEN
            INSERT (orden_idOrden, productos_idProductos, cantidad, precio, subtotal)
            VALUES (
                @idOrden,
                source.Productos_idProductos,
                source.cantidad,
                (SELECT precio FROM Productos WHERE idProductos = source.Productos_idProductos),
                source.cantidad * (SELECT precio FROM Productos WHERE idProductos = source.Productos_idProductos)
            );

        -- Actualizar el total de la orden
        UPDATE Orden
        SET total_orden = (
            SELECT SUM(subtotal)
            FROM OrdenDetalles
            WHERE orden_idOrden = @idOrden
        )
        WHERE idOrden = @idOrden;

        -- Limpiar la tabla temporal
        DROP TABLE #DetallesTemporales;

        -- Retornar la orden actualizada
        SELECT *
        FROM VerOrden
        WHERE idOrden = @idOrden;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        IF OBJECT_ID('tempdb..#DetallesTemporales') IS NOT NULL
            DROP TABLE #DetallesTemporales;
        THROW;
    END CATCH
END;


--  PROCEDIMIENTO ACTUALIZAR ORDEN MODIFICADO --
ALTER PROCEDURE ActualizarOrden
    @idOrden INT,           
    @direccion NVARCHAR(255),  
    @idEstado INT              
AS
BEGIN
    BEGIN TRANSACTION
    BEGIN TRY
       
        IF EXISTS (SELECT 1 FROM Orden WHERE idOrden = @idOrden)
        BEGIN
          
            UPDATE Orden
            SET direccion = @direccion,
                estados_idEstados = @idEstado  
            WHERE idOrden = @idOrden;

           
            SELECT *
            FROM VerOrden
            WHERE idOrden = @idOrden;
        END
        ELSE
        BEGIN
            
            THROW 50000, 'La orden no existe.', 1;
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END



-- VER PRODUCTO POR ID --
ALTER PROCEDURE VerProductoPorID
    @idProductos INT
AS
BEGIN
    SELECT 
        p.idProductos,
        p.nombre,
        p.marca,
        p.codigo,
        p.stock,
        p.precio,
        p.fecha_creacion,
        c.nombre AS categoria,
        u.nombre_completo AS usuario,
        e.idEstados
    FROM 
        Productos p
    INNER JOIN 
        CategoriaProductos c ON p.categoriaProductos_idCategoriaProductos = c.idCategoriaProductos
    INNER JOIN 
        Usuarios u ON p.usuarios_idUsuarios = u.idUsuarios
    INNER JOIN 
        Estados e ON p.estados_idEstados = e.idEstados
    WHERE 
        p.idProductos = @idProductos;
END;
