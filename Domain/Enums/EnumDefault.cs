using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace Domain.Enums
{
    /// <summary>
    /// Entidade Enum default, concentra operações basicas para enums
    /// </summary>
    /// <typeparam name="T">Tipo do enum</typeparam>
    public class EnumDefault<T>
    {
        /// <summary>
        /// Retorna todas as chaves do enum T
        /// </summary>
        /// <returns>
        /// Lisat contendo todas as chaves do Enum T
        /// </returns>
        public static List<string> RetornaChaves()
        {
            List<string> retorno = Enum.GetNames(typeof(T)).ToList();
            return retorno;

        }

        /// <summary>
        /// Retorna um Dictionary contando todas as chaves e valores do enum
        /// </summary>
        /// <returns>
        /// Retorna um Dictionary<string , int> contendo as chaves e os valores do enum 
        /// </returns>
        public static Dictionary<string, int> GetValues()
        {
            Dictionary<string, int> Values = new Dictionary<string, int>();
            string[] keys = Enum.GetNames(typeof(T)).ToArray();
            Array values = Enum.GetValues(typeof(T));
            for (int i = 0; i < keys.Length; i++)
            {
                string key = keys[i].Replace('_',' ');
                Values.Add(key, (int)values.GetValue(i));
            }

            return Values;
        }

        public static Dictionary<string, int> GetDescriptions()
        {
            Dictionary<string, int> Values = new Dictionary<string, int>();
            var descs = new List<string>();
            var names = Enum.GetNames(typeof(T));
            foreach (var name in names)
            {
                var field = typeof(T).GetField(name);
                var fds = field.GetCustomAttributes(typeof(DescriptionAttribute), true);
                foreach (DescriptionAttribute fd in fds)
                {
                    descs.Add(fd.Description);
                }
            }

            string[] keys = descs.ToArray();
            Array values = Enum.GetValues(typeof(T));
            for (int i = 0; i < keys.Length; i++)
            {
                string key = keys[i].Replace('_', ' ');
                Values.Add(key, (int)values.GetValue(i));
            }

            return Values;
        }

    }
}
