app.preferences.rulerUnits = Units.PIXELS;

var dossierSource = Folder.selectDialog(
  "Sélectionnez le dossier contenant vos 62 images :",
);

if (dossierSource != null) {
  // Configuration des dimensions cibles
  var nouvelleLargeur = 1406;
  var nouvelleHauteur = 648;
  var resolutionCible = 72;
  var margeHauteCible = 32;

  var dossierSortie = new Folder(dossierSource + "/Rendus_Modifies");
  if (!dossierSortie.exists) dossierSortie.create();

  var totalImages = 62;
  var imagesReussies = 0;
  var extensions = [".png", ".PNG"];

  var optionsPNG = new PNGSaveOptions();
  optionsPNG.compression = 0; // Pas de compression = netteté maximale

  for (var i = 1; i <= totalImages; i++) {
    var numeroFormate = ("0000" + i).slice(-4);
    var fichierTrouve = null;

    for (var e = 0; e < extensions.length; e++) {
      var fichierTest = new File(
        dossierSource + "/" + numeroFormate + extensions[e],
      );
      if (fichierTest.exists) {
        fichierTrouve = fichierTest;
        break;
      }
    }

    if (fichierTrouve != null) {
      var doc = app.open(fichierTrouve);

      // 1. Redimensionnement initial sur la largeur cible
      doc.resizeImage(
        UnitValue(nouvelleLargeur, "px"),
        null,
        resolutionCible,
        ResampleMethod.BICUBICSHARPER,
      );

      // 2. Ajout de la marge de sécurité en hauteur (on garde de la place pour manœuvrer)
      doc.resizeCanvas(
        UnitValue(nouvelleLargeur, "px"),
        UnitValue(nouvelleHauteur * 2, "px"),
        AnchorPosition.BOTTOMCENTER,
      );

      // 3. Déplacement précis de l'image pour caler le haut à 32px
      // On replace d'abord l'image tout en haut du canevas temporaire, puis on descend de 32px
      var bounds = doc.activeLayer.bounds;
      var positionActuelleY = bounds[1].value; // Récupère le haut actuel de l'image
      var deplacementY = -positionActuelleY + margeHauteCible;
      doc.activeLayer.translate(0, deplacementY);

      // 4. Recadrage final par le HAUT pour valider la marge de 32px et couper l'excès inutile tout en bas
      doc.resizeCanvas(
        UnitValue(nouvelleLargeur, "px"),
        UnitValue(nouvelleHauteur, "px"),
        AnchorPosition.TOPCENTER,
      );

      // Sauvegarde haute qualité
      var fichierSortieCible = new File(
        dossierSortie + "/" + fichierTrouve.name,
      );
      doc.saveAs(fichierSortieCible, optionsPNG, true, Extension.LOWERCASE);
      doc.close(SaveOptions.DONOTSAVECHANGES);
      imagesReussies++;
    }
  }
  alert(
    "Terminé ! Cadrage parfait (Bas préservé + Marge haute de 32px). " +
      imagesReussies +
      " images sauvegardées.",
  );
}
