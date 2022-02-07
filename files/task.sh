PRG="$0"
while [ -h "$PRG" ] ; do
  ls=`ls -ld "$PRG"`
  link=`expr "$ls" : '.*-> \(.*\)$'`
  if expr "$link" : '/.*' > /dev/null; then
    PRG="$link"
  else
    PRG=`dirname "$PRG"`/"$link"
  fi
done
PRGDIR=`dirname "$PRG"`
#

_classpath="."
if [ `uname -a | grep -i -c cygwin` -ne 0 ]; then # Cygwin, translate the path
    for k in "$PRGDIR"/lib/*.jar
    do
        _classpath="${_classpath};`cygpath -w ${k}`"
    done
else
    for k in "$PRGDIR"/lib/*.jar
    do
        _classpath="${_classpath}:${k}"
    done
fi

java -Xms512m -Xmx1024m -classpath "${_classpath}" "$@"
