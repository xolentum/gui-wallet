export default {
    buttons: {
        // All button text is uppercased in the gui
        all: "TODO",
        back: "ATRÁS",
        browse: "EXAMINAR",
        cancel: "CANCELAR",
        change: "MODIFICAR",
        close: "CERRAR",
        contacts: "CONTACTOS",
        copyAddress: "COPIAR DIRECCIÓN",
        createWallet: "CREAR MONEDERO",
        delete: "ELIMINAR",
        edit: "EDITAR",
        export: "EXPORTAR",
        import: "IMPORTAR",
        importWallet: "IMPORTAR MONEDERO | IMPORTAR MONEDEROS",
        next: "SIGUIENTE",
        openWallet: "ABRIR MONEDERO",
        receive: "RECIBIR",
        registerServiceNode: "REGISTRAR NODO DE SERVICIO",
        rescan: "VOLVER A EXAMINAR",
        restoreWallet: "RESTAURAR MONEDERO",
        save: "GUARDAR",
        saveTxNotes: "GUARDAR NOTAS TRANSFE",
        selectLocation: "SELECCIONAR UBICACIÓN",
        selectWalletFile: "SELECCIONAR ARCHIVO DEL MONEDERO",
        send: "ENVIAR",
        sendCoins: "ENVIAR MONEDAS",
        serviceNode: "NODO DE SERVICIO",
        settings: "CONFIGURACIÓN",
        showQRCode: "MOSTRAR CÓDIGO QR",
        showTxDetails: "MOSTRAR DETALLES TRANSFE",
        stake: "DEPOSITAR",
        unlockServiceNode: "LIBERAR NODO DE SERVICIO",
        viewOnExplorer: "VER EN EL EXPLORADOR"
    },
    dialog: {
        // Generic buttons
        buttons: {
            ok: "ACEPTAR",
            cancel: "CANCELAR",
            open: "ABRIR"
        },

        // Dialogs
        banPeer: {
            title: "Excluir pares",
            peerDetailsTitle: "Detalles del par",
            message: "Introduzca el periodo de exclusión del par en segundos.\nPor defecto 3600 = 1 hora.",
            ok: "Excluir par"
        },
        copyAddress: {
            title: "Copiar dirección",
            message: "Hay un id de pago asociado a esta dirección.\nAsegúrese de copiar también el id de pago por separado."
        },
        copyPrivateKeys: {
            // Copy {seedWords/viewKey/spendKey}
            title: "Copiar {type}",
            message: "Sea muy precavido al compartir sus claves privadas ya que estas permiten operar con sus fondos.",
            seedWords: "Palabras Semilla",
            viewKey: "Clave de Visualización",
            spendKey: "Clave de Gasto"
        },
        deleteWallet: {
            title: "Eliminar monedero",
            message: "¿Está absolutamente seguro de querer eliminar su monedero?\nAsegúrese de tener una copia de seguridad de sus claves privadas antes de proceder.\n¡ESTE PROCESO NO SE PUEDE DESHACER!",
            ok: "ELIMINAR"
        },
        exit: {
            title: "Salir",
            message: "¿Desea realmente salir del programa?",
            ok: "SALIR"
        },
        keyImages: {
            title: "{type} imágenes de la clave",
            message: "¿Desea {type} las imágenes de la clave?",
            export: "Exportar",
            import: "Importar"
        },
        noPassword: {
            title: "Sin contraseña",
            message: "¿Desea realmente crear un monedero sin contraseña?",
            ok: "SÍ"
        },
        password: {
            title: "Contraseña",
            message: "Introduzca la contraseña del monedero para continuar."
        },
        registerServiceNode: {
            title: "Registrar nodo de servicio",
            message: "¿Desea registrar el nodo de servicio?",
            ok: "REGISTRAR"
        },
        rescan: {
            title: "Volver a examinar el monedero",
            message: "Advertencia: Se perderá cierta información de las transferencias\nanteriores, como la dirección del destinatario.",
            ok: "VOLVER A EXAMINAR"
        },
        restart: {
            title: "Reiniciar",
            message: "Los cambios requieren un reinicio ¿Desea reiniciar ahora?",
            ok: "REINICIAR"
        },
        showPrivateKeys: {
            title: "Mostrar claves privadas",
            message: "¿Desea ver sus claves privadas?",
            ok: "MOSTRAR"
        },
        stake: {
            title: "Depósito",
            message: "¿Desea formalizar el depósito?",
            ok: "DEPOSITAR"
        },
        switchWallet: {
            title: "Cambiar de monedero",
            closeMessage: "¿Confirma que desea cerrar el monedero actual?",
            restartMessage: "El monedero se está sincronizando. \nSi desea cambiar de monedero, deberá reiniciar la aplicación. \nEl proceso de sincronización se perderá y será necesario volver a examinar la cadena de bloques."
        },
        transactionDetails: {
            title: "Detalles de la transferencia",
            ok: "CERRAR"
        },
        transfer: {
            title: "Transferir",
            message: "¿Desea enviar la transferencia?",
            ok: "ENVIAR"
        },
        unlockConfirm: {
            title: "Confirmar liberación",
            ok: "LIBERAR"
        },
        unlockServiceNode: {
            title: "Liberar nodo de servicio",
            confirmTitle: "Confirmar liberación",
            message: "¿Desea liberar el nodo de servicio?",
            ok: "LIBERAR"
        }
    },
    fieldLabels: {
        // Field labels are also all uppercased
        address: "DIRECCIÓN",
        amount: "CANTIDAD",
        awardRecepientAddress: "DIRECCIÓN DONDE SE ABONARÁN LAS RECOMPENSAS",
        confirmPassword: "CONFIRMAR CONTRASEÑA",
        daemonLogLevel: "NIVEL LOG PARA EL DEMONIO",
        daemonP2pPort: "PUERTO P2P DEMONIO",
        daemonZMQPort: "PUERTO ZMQ DEMONIO",
        dataStoragePath: "RUTA PARA ALMACENAMIENTO DE DATOS",
        filterTransactionType: "FILTRAR POR TIPO DE TRANSFE",
        filterTxId: "FILTRAR POR ID TRANSFE",
        internalWalletPort: "PUERTO INTERNO MONEDERO",
        keyImages: {
            exportDirectory: "DIRECTORIO AL QUE EXPORTAR LA IMAGEN DE LA CLAVE",
            importFile: "ARCHIVO DE IMPORTACIÓN DE LA IMAGEN DE LA CLAVE"
        },
        limitDownloadRate: "LÍMITE VELOCIDAD DE DESCARGA",
        limitUploadRate: "LÍMITE VELOCIDAD DE SUBIDA",
        localDaemonIP: "IP DEMONIO LOCAL",
        localDaemonPort: "PUERTO DEMONIO LOCAL",
        maxIncomingPeers: "NÚM. MÁX. PARES ENTRANTES",
        maxOutgoingPeers: "NÚM. MÁX. PARES SALIENTES",
        mnemonicSeed: "SEMILLA MNEMÓNICA",
        name: "NOMBRE",
        newWalletName: "NUEVO NOMBRE PARA EL MONEDERO",
        notes: "NOTAS",
        optional: "OPCIONAL",
        password: "CONTRASEÑA",
        paymentId: "ID PAGO",
        priority: "PRIORIDAD",
        remoteNodeHost: "HOST NODO REMOTO",
        remoteNodePort: "PUERTO NODO REMOTO",
        restoreFromBlockHeight: "RESTAURAR DESDE EL BLOQUE NÚMERO",
        restoreFromDate: "RESTAURAR DESDE EL DÍA",
        seedLanguage: "IDIOMA SEMILLA",
        serviceNodeCommand: "COMANDO PARA REGISTRAR DEL NODO DE SERVICIO",
        serviceNodeKey: "CLAVE NODO DE SERVICIO",
        walletFile: "ARCHIVO MONEDERO",
        walletLogLevel: "NIVEL LOG MONEDERO",
        walletName: "NOMBRE MONEDERO",
        walletRPCPort: "PUERTO RPC MONEDERO",
        walletStoragePath: "RUTA ALMACENAMIENTO MONEDERO",

        // These are specific labels which do not get uppercased
        confirmNewPassword: "Confirme la nueva Contraseña",
        newPassword: "Contraseña nueva",
        oldPassword: "Contraseña antigua",
        rescanFullBlockchain: "Volver a examinar la cadena de bloques al completo",
        rescanSpentOutputs: "Volver a examinar las salidas gastadas",
        transactionNotes: "Notas de la Transferencia",
        chooseNetwork: "Seleccione una Red",
        network: "Red"
    },
    footer: {
        ready: "LISTO",
        scanning: "EXAMINANDO",
        status: "Estado",
        syncing: "SINCRONIZANDO",
        remote: "Remoto",
        wallet: "Monedero"
    },
    menuItems: {
        about: "Acerca de",
        changePassword: "Modificar Contraseña",
        copyAddress: "Copiar dirección",
        copyQR: "Copiar código QR",
        copySeedWords: "Copiar palabras semilla",
        copySpendKey: "Copiar clave de gasto",
        copyTransactionId: "Copiar ID de transferencia",
        copyViewKey: "Copiar clave de visualización",
        createNewWallet: "Crear nuevo monedero",
        deleteWallet: "Eliminar monedero",
        exit: "Cerrar interfaz gráfica monedero Loki",
        importOldGUIWallet: "Importar monedero de una interfaz gráfica antigua",
        manageKeyImages: "Administrar Imágenes de Clave",
        openWallet: "Abrir monedero",
        rescanWallet: "Volver a examinar monedero",
        restoreWalletFile: "Restaurar monedero de un archivo",
        restoreWalletSeed: "Restaurar monedero mediante semilla",
        saveQR: "Guardar código QR en archivo",
        sendToThisAddress: "Enviar a esta dirección",
        settings: "Configuración",
        showDetails: "Mostrar detalles",
        showPrivateKeys: "Mostrar Claves Privadas",
        showQRCode: "Mostrar código QR",
        switchWallet: "Cambiar de monedero",
        viewOnExplorer: "Ver en el explorador"
    },
    notification: {
        positive: {
            addressCopied: "Dirección copiada al portapapeles",
            bannedPeer: "{host} excluido hasta {time}",
            copied: "{item} copiado al portapapeles",
            itemSaved: "{item} guardado en {filename}",
            keyImages: {
                exported: "Imágenes de clave exportadas a {filename}",
                imported: "Imágenes de clave importadas"
            },
            passwordUpdated: "Contraseña actualizada",
            qrCopied: "Código QR copiado al portapapeles",
            registerServiceNodeSuccess: "Nodo de servicio registrado correctamente",
            sendSuccess: "Transferencia enviada correctamente",
            stakeSuccess: "Depósito realizado correctamente",
            transactionNotesSaved: "Notas de la transferencia guardadas"
        },
        errors: {
            banningPeer: "Error excluyendo par",
            cannotAccessRemoteNode: "No ha sido posible acceder al nodo remoto. Tenga la amabilidad de probar con otro",
            changingPassword: "Error al modificar la contraseña",
            copyWalletFail: "La copia del monedero ha fallado",
            copyingPrivateKeys: "Error al copiar las claves privadas",
            dataPathNotFound: "No se ha encontrado la ruta para el almacenamiento de datos",
            differentNetType: "El nodo remoto usa un nettype diferente",
            enterSeedWords: "Introduzca las palabras semilla",
            enterWalletName: "Introduzca un nombre para el monedero",
            errorSavingItem: "Error al guardar {item}",
            failedServiceNodeUnlock: "La liberación del nodo de servicio ha fallado",
            failedToSetLanguage: "Fallo al cambiar de idioma: {lang}",
            failedWalletImport: "Fallo al importar el monedero",
            failedWalletOpen: "Fallo al abrir el monedero. Inténtelo de nuevo.",
            internalError: "Error interno",
            invalidAddress: "Dirección no válida",
            invalidAmount: "Cantidad no válida",
            invalidOldPassword: "Contraseña antigua incorrecta",
            invalidPassword: "Contraseña incorrecta",
            invalidPaymentId: "id de pago no válido",
            invalidPrivateViewKey: "Clave de visualización privada no válida",
            invalidPublicAddress: "Dirección pública no válida",
            invalidRestoreDate: "Fecha de restauración no válida",
            invalidRestoreHeight: "Altura de bloque no válida",
            invalidSeedLength: "Cantidad de palabras en la semilla incorrecta",
            invalidServiceNodeCommand: "Por favor, introduzca el comando para registrar el nodo de servicio",
            invalidServiceNodeKey: "Clave de nodo de servicio no válida",
            invalidWalletPath: "Ruta del monedero no válida",
            keyImages: {
                exporting: "Error exportando imágenes de clave",
                reading: "Error leyendo imágenes de clave",
                importing: "Error importando imágenes de clave"
            },
            negativeAmount: "La cantidad no puede ser negativa",
            newPasswordNoMatch: "Las contraseñas nuevas no coinciden",
            newPasswordSame: "La contraseña nueva ha de ser diferente",
            notEnoughBalance: "No hay suficiente saldo libre",
            passwordNoMatch: "Las contraseñas no coinciden",
            remoteCannotBeReached: "No es posible contactar con el demonio remoto",
            unknownError: "Ha ocurrido un error inesperado",
            walletAlreadyExists: "Ya existe un monedero con este nombre",
            walletPathNotFound: "Ruta para almacenamiento de datos no encontrada",
            zeroAmount: "La cantidad ha de ser mayor que cero"
        },
        warnings: {
            noKeyImageExport: "No se han encontrado claves para exportar",
            usingLocalNode: "No se ha podido acceder al nodo remoto, utilizando solo el nodo local",
            usingRemoteNode: "lokid no encontrado, utilizando nodo remoto"
        }
    },
    placeholders: {
        additionalNotes: "Notas adicionales",
        addressBookName: "Nombre asociado a esta dirección",
        enterAnId: "Introduzca un ID",
        hexCharacters: "{count} caracteres hexadecimales",
        mnemonicSeed: "Semilla mnemónica de 25 (o 24) palabras",
        selectAFile: "Seleccione un archivo por favor",
        transactionNotes: "Notas adicionales para agregar a la transferencia",
        walletName: "Nombre para identificar su monedero",
        walletPassword: "Contraseña opcional para proteger su monedero"
    },
    strings: {
        addAddressBookEntry: "Agregar registro a la libreta de direcciones",
        addressBookDetails: "Detalles de la libreta de direcciones",
        addressBookIsEmpty: "La libreta de direcciones está vacía",
        addresses: {
            myPrimaryAddress: "Mi dirección principal",
            myUnusedAddresses: "Mis direcciones no usadas",
            myUsedAddresses: "Mis direcciones usadas",
            notYourAddress: "¡No es una dirección que le pertenezca!",
            primaryAddress: "Dirección principal",
            subAddress: "Dirección auxiliar",
            subAddressIndex: "Índice",
            yourPrimaryAddress: "Su dirección principal",
            yourUnusedAddress: "Su dirección no usada",
            yourUsedAddress: "Su dirección usada"
        },
        advancedOptions: "Opciones avanzadas",
        bannedPeers: {
            title: "Pares excluidos (las exclusiones se anularán si reinicia el monedero)",
            bannedUntil: "Excluido hasta {time}"
        },
        blockHeight: "Altura",
        transactionConfirmed: "confirmada",
        closing: "Cerrando",
        connectingToBackend: "Conectando al servidor",
        daemon: {
            local: {
                title: "Solo Demonio Local",
                description: "Seguridad completa. Se descargará la cadena de bloques al completo. No podrá operar hasta que no haya finalizado el proceso de sincronización."
            },
            localRemote: {
                title: "Demonio Local + Remoto",
                description: "Empiece a operar rápidamente gracias a esta opción predeterminada. Se descargará la cadena de bloques al completo pero se usará un nodo remoto mientras dure la descarga."
            },
            remote: {
                title: "Solo Demonio Remoto",
                description: "Menor seguridad. El monedero se conectará a un nodo remoto para realizar cualquier operación."
            }
        },
        priorityOptions: {
            automatic: "Automática",
            slow: "Lenta",
            normal: "Normal",
            fast: "Rápida",
            fastest: "La más rápida"
        },
        destinationUnknown: "Destino Desconocido",
        editAddressBookEntry: "Modificar un registro de la libreta de direcciones",
        loadingSettings: "Cargando configuración",
        lokiBalance: "Saldo",
        lokiUnlockedBalance: "Saldo libre",
        lokiUnlockedShort: "Libre",
        noTransactionsFound: "No se han encontrado transferencias",
        notes: "Notas",
        numberOfUnspentOutputs: "Número de salidas no gastadas",
        paymentID: "ID de pago",
        peerList: "Lista de pares",
        readingWalletList: "Leyendo el listado de monederos",
        recentIncomingTransactionsToAddress: "Transferencias recientes recibidas en esta dirección",
        recentTransactionsWithAddress: "Transferencias recientes con esta dirección",
        rescanModalDescription: "Escoja entre un examen completo o examinar solo las salidas gastadas.",
        saveSeedWarning: "¡Por favor, cópielas y guárdelas en un sitio seguro!",
        saveToAddressBook: "Guardar en la libreta de direcciones",
        seedWords: "Palabras semilla",
        selectLanguage: "Escoja un idioma",
        serviceNodeRegistrationDescription: "Introduzca el comando {registerCommand} producido por el demonio que se está intentado registrar como Nodo de Servicio usando la instrucción \"{prepareCommand}\"",
        spendKey: "Clave de gasto",
        startingDaemon: "Iniciando demonio",
        startingWallet: "Iniciando monedero",
        switchToDateSelect: "Cambiar a selección por fecha",
        switchToHeightSelect: "Cambiar a selección por altura",
        transactionID: "ID de la transferencia",
        transactions: {
            amount: "Cantidad",
            description: "Transferencia {type}",
            fee: "Comisión",
            paidBySender: "pagada por el remitente",
            received: "Recibida",
            sent: "Enviada",
            sentTo: "Transferencia {type} enviada a",
            timestamp: "Fecha y hora",
            types: {
                all: "Todas",
                incoming: "Recibida",
                outgoing: "Emitida",
                pending: "Pendiente",
                pendingIncoming: "Recibida pendiente",
                pendingOutgoing: "Emitida pendiente",
                miner: "Minera",
                serviceNode: "Nodo de Servicio",
                governance: "Gobernanza",
                stake: "Depósito",
                failed: "Fallida"
            }
        },
        unspentOutputs: "Salidas no gastadas",
        userNotUsedAddress: "No ha utilizado esta dirección",
        userUsedAddress: "Ha utilizado esta dirección",
        viewKey: "Clave de visualización",
        viewOnlyMode: "Este monedero solo permite visualizar operaciones. Por favor, abra uno completo para poder transferir fondos."
    },
    titles: {
        addressBook: "Libreta de direcciones",
        addressDetails: "Detalles de la dirección",
        changePassword: "Modificar contraseña",
        configure: "Configurar",
        privateKeys: "Claves privadas",
        rescanWallet: "Volver a examinar monedero",
        serviceNode: {
            registration: "REGISTRO",
            staking: "DEPÓSITO",
            unlock: "LIBERACIÓN"
        },
        settings: {
            title: "Configuración",
            tabs: {
                general: "General",
                language: "Idioma",
                peers: "Pares"
            }
        },
        transactionDetails: "Detalles de la transferencia",
        transactions: "Transferencias",
        wallet: {
            createNew: "Crear un monedero nuevo",
            createdOrRestored: "Monedero creado/restaurado",
            importFromFile: "Importar monedero de un archivo",
            importFromLegacyGUI: "Importar monedero de una interfaz gráfica heredada",
            importFromOldGUI: "Importar monedero de una interfaz gráfica antigua",
            restoreFromSeed: "Restaurar monedero mediante semilla",
            restoreViewOnly: "Restaurar monedero de solo visualización"
        },
        welcome: "Bienvenido/a",
        yourWallets: "Sus Monederos"
    }
}
