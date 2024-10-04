package school.sptech;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

public class Main {

    public static void main(String[] args) {


        //Instancia uma nova S3
        S3Provider s3 = new S3Provider();

        //Busca o usuário e autentica a sessão
        S3Client s3Client = s3.getS3Client();

        //Caminho para baixar a base de dados
        String caminhoParaInstalacao = "C:/Users/Gusta/Downloads/base-de-dados.xlsx";

        // Lista todos os objetos dentro do bucket específicado
        ListObjectsRequest listObjects = ListObjectsRequest.builder()
                .bucket("discharge-bucket")
                .build();
        List<S3Object> objects = s3Client.listObjects(listObjects).contents();

        // Define o arquivo da base de dados como o primeiro da lista
        S3Object baseDeDados = objects.getFirst();

        for (S3Object object : objects) {
            if(Objects.equals(object.key(), "base-de-dados.xlsx")){
                baseDeDados = object;
            }
        }

        if(!Objects.equals(baseDeDados.key(), "base-de-dados.xlsx")){
            System.out.println("Não encontrei a base de dados no Bucket");
            return;
        }

        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket("discharge-bucket")
                .key(baseDeDados.key())
                .build();

        s3Client.getObject(getObjectRequest, Paths.get(caminhoParaInstalacao));
        System.out.println("Arquivo baixado para: " + caminhoParaInstalacao);





    }
}