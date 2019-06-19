export default {
    buttons: {
        // All button text is uppercased in the gui
        all: "TUDO",
        back: "ATRÁS",
        browse: "PESQUISAR",
        cancel: "CANCELAR",
        change: "MUDAR",
        close: "FECHAR",
        contacts: "CONTACTOS",
        copyAddress: "COPIAR ENDEREÇO",
        createWallet: "CRIAR CARTEIRA",
        delete: "APAGAR",
        edit: "EDITAR",
        export: "EXPORTAR",
        import: "IMPORTAR",
        importWallet: "IMPORTAR CARTEIRA | IMPORTAR CARTEIRAS",
        next: "PRÓXIMO",
        openWallet: "ABRIR CARTEIRA",
        receive: "RECEBER",
        registerServiceNode: "REGISTAR NÓDULO DE SERVIÇO",
        rescan: "REEXAMINAR",
        restoreWallet: "RESTAURAR CARTEIRA",
        save: "SALVAR",
        saveTxNotes: "SALVAR NOTAS DE TX",
        selectLocation: "SELECIONAR LOCAL",
        selectWalletFile: "SELECIONAR FICHEIRO DA CARTEIRA",
        send: "ENVIAR",
        sendCoins: "ENVIAR MOEDAS",
        serviceNode: "NÓDULO DE SERVIÇO",
        settings: "CONFIGURAÇÕES",
        showQRCode: "MOSTRAR CÓDIGO QR",
        showTxDetails: "MOSTRAR DETALHES DA TX",
        stake: "PARTICIPAÇÃO",
        sweepAll: "VARRER TUDO",
        unlockServiceNode: "DESBLOQUEAR NÓDULO DE SERVIÇO",
        viewOnExplorer: "VISUALIZAR NO EXPLORADOR"
    },
    dialog: {
        // Generic buttons
        buttons: {
            ok: "OK",
            cancel: "CANCELAR",
            open: "ABRIR"
        },

        // Dialogs
        banPeer: {
            title: "Banir pares",
            peerDetailsTitle: "Detalhes dos pares",
            message: "Introduzir duração para banir pares, em segundos.\nDefault 3600 = 1 hora.",
            ok: "Banir par"
        },
        copyAddress: {
            title: "Copiar endereço",
            message: "Existe um id de pagamento associado a este endereço.\nTenha a certeza de copiar este id de pagamanto separadamente."
        },
        copyPrivateKeys: {
            // Copy {seedWords/viewKey/spendKey}
            title: "Copiar {type}",
            message: "Tenha cuidado a quem envia as suas chaves privadas, pois elas controlam os seus fundos.",
            seedWords: "Palavras Semente",
            viewKey: "Chave de Visualização",
            spendKey: "Chave de Gasto"
        },
        deleteWallet: {
            title: "Apagar carteira",
            message: "Tem a certeza absoluta que pretende apagar a sua carteira?\nTenha a certeza que tem um backup da suas chaves privadas.\nESTE PROCESSO NÃO É REVERSÍVEL!",
            ok: "APAGAR"
        },
        exit: {
            title: "Sair",
            message: "Tem a certeza que deseja sair?",
            ok: "SAIR"
        },
        keyImages: {
            title: "{type} imagens chave",
            message: "Quer {type} imagens chave?",
            export: "Exportar",
            import: "Importar"
        },
        noPassword: {
            title: "Nenhum palavra-passe definida",
            message: "Tem a certeza que deseja criar uma carteira sem palavra-passe?",
            ok: "SIM"
        },
        password: {
            title: "Palavra-passe",
            message: "Introduza a sua palavra-passe para continuar"
        },
        registerServiceNode: {
            title: "Registar um nódulo de serviço",
            message: "Pretende registar um nódulo de serviço?",
            ok: "REGISTAR"
        },
        rescan: {
            title: "Reexaminar carteira",
            message: "Aviso: Algumas informações acerca de transações passadas serão perdidas,\ntal como o endereço dos recipientes que serão perdidos.",
            ok: "REEXAMINAR"
        },
        restart: {
            title: "Reiniciar",
            message: "Alterações requerem um reiniciar. Quer reiniciar agora?",
            ok: "Reiniciar"
        },
        showPrivateKeys: {
            title: "Mostrar chaves privadas",
            message: "Deseja ver as suas chaves privadas?",
            ok: "MOSTRAR"
        },
        stake: {
            title: "Participação num nódulo de serviço",
            message: "Deseja participar num nódulo de serviço?",
            ok: "Participação"
        },
        sweepAll: {
            title: "Varrer Tudo",
            message: "Quer realmente varrer tudo?",
            ok: "VARRER TUDO"
        },
        switchWallet: {
            title: "Mudar de carteira",
            closeMessage: "Tem a certeza que deseja fechar a carteira actual?",
            restartMessage: "A carteira RPC está correntemente em sincronização. \nISe deseja mudar de carteira terá de reiniciar a aplicação. \nPerderá o progresso da sincronização e terá de reexaminar o blockchain."
        },
        transactionDetails: {
            title: "Detalhes das transações",
            ok: "FECHAR"
        },
        transfer: {
            title: "Transferir",
            message: "Deseja enviar a transação?",
            ok: "ENVIAR"
        },
        unlockConfirm: {
            title: "Confirmar desbloqueamento",
            ok: "DESBLOQUEAR"
        },
        unlockServiceNode: {
            title: "Desbloquear nódulo de serviço",
            confirmTitle: "Confirmar desbloqueio",
            message: "Deseja desbloquear o nódulo de serviço?",
            ok: "DESBLOQUEAR"
        }
    },
    fieldLabels: {
        // Field labels are also all uppercased
        address: "ENDEREÇO",
        amount: "QUANTIDADE",
        confirmPassword: "CONFIRMAR PALAVRA-PASSE",
        daemonLogLevel: "NÍVEL DE LOG PARA O SERVIÇO",
        daemonP2pPort: "PORTA P2P DO SERVIÇO",
        daemonZMQPort: "PORTA ZMQ DO SERVIÇO",
        dataStoragePath: "DIRECTÓRIO DE ARMAZENAMENTO DOS DADOS",
        filterTransactionType: "FILTRAR POR TIPO DE TRANSAÇÃO",
        filterTxId: "FILTRAR POR TXID",
        internalWalletPort: "PORTA INTERNA DA CARTEIRA",
        keyImages: {
            exportDirectory: "DIRETORIA DE EXPORTAÇÃO DAS CHAVES DE IMAGEM",
            importFile: "FICHEIRO DE IMPORTAÇÃO DAS CHAVES DE IMAGEM"
        },
        limitDownloadRate: "LIMITAR VELOCIDADE DE DOWNLOAD",
        limitUploadRate: "LIMITE DA VELOCIDADE DE UPLOAD",
        localDaemonIP: "IP LOCAL DO SERVIÇO",
        localDaemonPort: "PORTA LOCAL DO SERVIÇO",
        maxIncomingPeers: "NÚM. MAX DE PARES DE ENTRADA",
        maxOutgoingPeers: "NUM. MAX DE PARES DE SAÍDA",
        mnemonicSeed: "SEMENTE MNEMÓNICA",
        name: "NOME",
        newWalletName: "NOME DA NOVA CARTEIRA",
        notes: "NOTAS",
        optional: "OPCIONAL",
        password: "PALAVRA-PASSE",
        paymentId: "ID DE PAGAMENTO",
        priority: "PRIORIDADE",
        remoteNodeHost: "NÓDULO HÓSPEDE REMOTO",
        remoteNodePort: "PORTA REMOTA DO NÓDULO",
        restoreFromBlockHeight: "RESTAURE DESDE ALTURA DO BLOCO",
        restoreFromDate: "RESTAURAR DESDE DATA",
        seedLanguage: "LINGUA DA SEMENTE",
        serviceNodeCommand: "COMANDO DO NÓDULO DE SERVIÇO",
        serviceNodeKey: "CHAVE DO NÓDULO DE SERVIÇO",
        walletFile: "FICHEIRO DA CARTEIRA",
        walletLogLevel: "NIVEL DE LOG DA CARTEIRA",
        walletName: "NOME DA CARTEIRA",
        walletRPCPort: "PORTA RPC DA CARTEIRA",
        walletStoragePath: "DIRECTORIA DE SALVAMENTO DA CARTEIRA",

        // These are specific labels which do not get uppercased
        confirmNewPassword: "Confirmar Nova Palavra-Passe",
        newPassword: "Nova Palavra-Passe",
        oldPassword: "Antiga Palavra-Passe",
        rescanFullBlockchain: "Reexaminar o blockchain completo",
        rescanSpentOutputs: "Reexaminar saídas gastas",
        transactionNotes: "Notas de Transações",
        chooseNetwork: "Seleccione uma Rede",
        network: "Rede"
    },
    footer: {
        ready: "Pronto",
        scanning: "Examinando",
        status: "Estado",
        syncing: "SINCRONIZANDO",
        remote: "Remoto",
        wallet: "Carteira"
    },
    menuItems: {
        about: "Sobre",
        changePassword: "Alterar Palavra-Passe",
        copyAddress: "Copiar Endereço",
        copyQR: "Copiar código QR",
        copySeedWords: "Copiar palavras semente",
        copySpendKey: "Copiar chave de gasto",
        copyTransactionId: "Copira ID da transação",
        copyViewKey: "Copiar chave de visualização",
        createNewWallet: "Criar nova carteira",
        deleteWallet: "Apagar carteira",
        exit: "Saír da Carteira GUI Loki",
        importOldGUIWallet: "Importar carteiras da antiga carteira GUI",
        manageKeyImages: "Administrar Imagens de Chave",
        openWallet: "Abrir carteira",
        rescanWallet: "Reexaminar Carteira",
        restoreWalletFile: "Restaurar carteira a partir de ficheiro",
        restoreWalletSeed: "Restaurar carteira a partir da semente",
        saveQR: "Salvar código QR para um ficheiro",
        sendToThisAddress: "Enviar para este endereço",
        settings: "Configurações",
        showDetails: "Mostrar detalhes",
        showPrivateKeys: "Mostrar Chaves Privadas",
        showQRCode: "Mostrar Código QR",
        switchWallet: "Mudar de Carteira",
        viewOnExplorer: "Visualizar no explorador"
    },
    notification: {
        positive: {
            addressCopied: "Copiar endereço para o clipboard",
            bannedPeer: "{host} banido até {time}",
            copied: "{item} copiado para o clipboard",
            itemSaved: "{item} salvado em {filename}",
            keyImages: {
                exported: "Imagens de Chave exportadas para {filename}",
                imported: "Imagens de Chave importadas"
            },
            passwordUpdated: "Palavra-Passe actualizada",
            qrCopied: "Código QR ccopiado para o clipboard",
            registerServiceNodeSuccess: "Nódulo de serviço registado com sucesso",
            sendSuccess: "Transação enviada com sucesso.",
            stakeSuccess: "Participação com sucesso",
            transactionNotesSaved: "A nota de transação foi salva"
        },
        errors: {
            banningPeer: "Erro ao banir par",
            cannotAccessRemoteNode: "Não foi possível aceder ao nódulo remoto, por favor experimente outro nódulo remoto",
            changingPassword: "Erro ao alterar palabra-passe",
            copyWalletFail: "Cópia da carteira falhou",
            copyingPrivateKeys: "Erro ao copiar as chaves privadas",
            dataPathNotFound: "Directoria de armazenamento de dados não encontrada",
            differentNetType: "Nódulo remoto está usando um tipo de rede diferente",
            enterSeedWords: "Introduzir palavras semente",
            enterWalletName: "Introduza o nome da carteira",
            errorSavingItem: "Erro salvando {item}",
            failedServiceNodeUnlock: "Falhou o desbloqueamento do nódulo de serviço",
            failedToSetLanguage: "Falhou mudança de língua: {lang}",
            failedWalletImport: "Falhou importação da carteira",
            failedWalletOpen: "Falhou abertura da carteira. Por favor tente de novo.",
            internalError: "Erro interno",
            invalidAddress: "Endereço não válido",
            invalidAmount: "Quantidade não válida",
            invalidOldPassword: "Palavra-passe antiga inválida",
            invalidPassword: "Palavra-passe inválida",
            invalidPaymentId: "ID de pagamento inválido",
            invalidPrivateViewKey: "Chave de visualização privada inválida",
            invalidPublicAddress: "Endereço público inválido",
            invalidRestoreDate: "Data de restauro inválido",
            invalidRestoreHeight: "Altura de restauro inválido",
            invalidSeedLength: "Comprimento da palavra semente inválido",
            invalidServiceNodeCommand: "Por favor introduza o comando de registro do nódulo de serviço",
            invalidServiceNodeKey: "Chave do nódulo de serviço inválido",
            invalidWalletPath: "Caminho da carteira inválido",
            keyImages: {
                exporting: "Erro ao exportar as chaves de imagem",
                reading: "Erro ao ler as chaves de imagem",
                importing: "Erro ao importar as chaves de imagem"
            },
            negativeAmount: "Quantidade não pode ser negativa",
            newPasswordNoMatch: "Nova palavra-passe não coincide",
            newPasswordSame: "Nova palavra-passe tem de ser diferente",
            notEnoughBalance: "Não existe saldo desbloqueado suficiente",
            passwordNoMatch: "Palavra-passe não coincidem",
            remoteCannotBeReached: "Não é possivel contactar o nódulo Remoto",
            selectWalletFile: "Seleccione um ficheiro de carteira",
            unknownError: "Ocorreu um error desconhecido",
            walletAlreadyExists: "Carteira com esse nome já existe",
            walletPathNotFound: "Caminho de armazenamento dos dados da carteira não encontrado",
            zeroAmount: "Quantidade tem de ser superior a zero"
        },
        warnings: {
            noKeyImageExport: "Nenhuma chave de imagem encontrada para exportar",
            usingLocalNode: "Não foi possível aceder ao nódulo remoto, mudando para nódulo local apenas",
            usingRemoteNode: "lokid não encontrado, utilizando nódulo remoto"
        }
    },
    placeholders: {
        additionalNotes: "Notas adicionais",
        addressBookName: "Nome que pertence a este endereço",
        enterAnId: "Introduza um ID",
        hexCharacters: "{count} caracteres hexadecimais",
        mnemonicSeed: "25 (or 24) palavras semente mnemónicas",
        selectAFile: "Por favor selecione um ficheiro",
        transactionNotes: "Notas adicionais para anexar à transação",
        walletName: "Um nome para a sua carteira",
        walletPassword: "Uma palavra-passe opcional para a carteira"
    },
    strings: {
        addAddressBookEntry: "Adicionar registo ao livro de endereços",
        addressBookDetails: "Detalhes do livro de endereço",
        addressBookIsEmpty: "Livro de endereço vazio",
        addresses: {
            myPrimaryAddress: "Meu endereço primario",
            myUnusedAddresses: "Meus endereços não utilizados",
            myUsedAddresses: "Meus endereços utilizados",
            primaryAddress: "Endereço primario",
            subAddress: "Sub-endereço",
            subAddressIndex: "Índice {index}"
        },
        advancedOptions: "Opções Avançadas",
        bannedPeers: {
            title: "Pares banidos (banimento serão anulados ao reiniciar a carteira)",
            bannedUntil: "Banido até {time}"
        },
        blockHeight: "Altura",
        transactionConfirmed: "confirmado",
        closing: "Fechando",
        connectingToBackend: "Conectado ao backend",
        daemon: {
            local: {
                title: "Serviço Local Apenas",
                description: "Segurança total, a carteira irá baixar o blockchain completo. Não será capaz de transaccionar até a sincronização completar."
            },
            localRemote: {
                title: "Serviço Local + Remoto",
                description: "Comece rápidamente com esta opção padrão. A carteira irá baixar o blockchain completo, mas usar um nódulo remoto enquanto sincroniza."
            },
            remote: {
                title: "Serviço Remoto Apenas",
                description: "Menos segurança, a carteira irá conectar a um nódulo remoto para todas as transações."
            }
        },
        priorityOptions: {
            automatic: "Automatico",
            slow: "Lento",
            normal: "Normal",
            fast: "Rápido",
            fastest: "O Mais Rápido"
        },
        destinationUnknown: "Destino Desconhecido",
        editAddressBookEntry: "Editar registo do livro de endereços",
        loadingSettings: "Carregando configurações",
        lokiBalance: "Saldo",
        lokiUnlockedBalance: "Saldo desbloqueado",
        lokiUnlockedShort: "Desbloqueado",
        noTransactionsFound: "Nenhuma transação encontrada",
        notes: "Notas",
        numberOfUnspentOutputs: "Número de outputs não gastos",
        paymentID: "ID de Pagamento",
        peerList: "Lista de pares",
        readingWalletList: "Lendo lista da carteira",
        recentIncomingTransactionsToAddress: "Transações de entrada neste endereço",
        recentTransactionsWithAddress: "Transações recentes neste endereço",
        rescanModalDescription: "Seleccione examinação completa ou examinação de outputs gastos apenas.",
        saveSeedWarning: "Por favor copie e salve estes num lugar seguro!",
        saveToAddressBook: "Salvar para o livro de endereço",
        seedWords: "Palavras semente",
        selectLanguage: "Selecione língua",
        serviceNodeRegistrationDescription: "Introduza o {registerCommand} commando produzido pelo serviço que está se registando para se tornar un Nódulo de Serviço utilizando o commando \"{prepareCommand}\" ",
        spendKey: "Chave de gasto",
        startingDaemon: "Começando serviço",
        startingWallet: "Começando carteira",
        switchToDateSelect: "Mudar para data de seleção",
        switchToHeightSelect: "Mudar para altura de seleção",
        transactionID: "ID da Transação",
        transactions: {
            amount: "Quantidade",
            description: "{type} transação",
            fee: "Taxa",
            paidBySender: "pago por remetente",
            received: "Recebido",
            sent: "Enviado",
            sentTo: "{type} transacão enviada a",
            timestamp: "Data e hora",
            types: {
                all: "Todos",
                incoming: "Entradas",
                outgoing: "Saídas",
                pending: "Pendentes",
                pendingIncoming: "Entradas pendentes",
                pendingOutgoing: "Saídas pendentes",
                miner: "Mineiro",
                serviceNode: "Nódulo de Serviço",
                governance: "Governança",
                stake: "Participação",
                failed: "Falhou"
            }
        },
        unspentOutputs: "Outputs não-gastos",
        userNotUsedAddress: "Não utilizou este endereço",
        userUsedAddress: "Já utilizou este endereço",
        viewKey: "Chave de visualização",
        viewOnlyMode: "Modo de visualização apenas. Por favor carregue a carteira completa para poder enviar moedas."
    },
    titles: {
        addressBook: "Livro de endereços",
        addressDetails: "Detalhes do endereço",
        changePassword: "Mudar palavra-passe",
        configure: "Configure",
        privateKeys: "Chaves privadas",
        rescanWallet: "Reexaminar carteira",
        serviceNode: {
            registration: "REGISTO",
            staking: "PARTICIPAÇÃO",
            unlock: "DESBLOQUEAR"
        },
        settings: {
            title: "Configurações",
            tabs: {
                general: "Geral",
                language: "Língua",
                peers: "Pares"
            }
        },
        transactionDetails: "Detalhes das transações",
        transactions: "Transações",
        wallet: {
            createNew: "Criar nova carteira",
            createdOrRestored: "Carteira criada/restaurada",
            importFromFile: "Importar carteira a partir de ficheiro",
            importFromLegacyGUI: "Importar carteira a partir da antiga carteira GUI (legado)",
            importFromOldGUI: "Importar carteira a partir da antiga carteira GUI",
            restoreFromSeed: "Restaurar carteira a partir de semente",
            restoreViewOnly: "Restaurar carteira visualização-apenas"
        },
        welcome: "Bem-vindo",
        yourWallets: "Suas carteiras"
    }
}
